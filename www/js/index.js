/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var HOST = "http://push2party.herokuapp.com/";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/** Funciones para cache **/
function setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function getCache(key) {
    return JSON.parse(window.localStorage.getItem(key));
}


function isCache(key) {
    return window.localStorage.getItem(key) !== null && window.localStorage.getItem(key) !== undefined;
}

function removeCache(key) {
    window.localStorage.removeItem(key);
}

function showAlert(message, title, button, callback) {
    navigator.notification.alert(
                                 message,  // message
                                 callback, // callback
                                 title,    // title
                                 button    // buttonName
                                 );
}

function showMessage(message){
    showAlert(message," ","Ok", null);
}

function showConfirm(message, title, callback, labels) {
    navigator.notification.confirm(
                                   message,  // message
                                   callback,// callback to invoke with index of button pressed
                                   title,    // title
                                   labels    // buttonLabels
                                   );
}

function requestService(url, type, data, success, fail){

    $.ajax({
       url: url,
       type: type,
       data: data,
       timeout: 30000,
       success: success,
       fail: fail
    });
}

function getOrInitShoppingVar(){
    if (isCache("shopping")){
        return getCache("shopping");
    } else {
        setCache("shopping", {
                 items: {},
                 paquetes: {}
                 });
        return getCache("shopping");
    }
}

function resetShoppingVar(){
    setCache("shopping", {
             items: {},
             paquetes: {}
    });
}

function initOrGetValue(object, key, price, description){
    var shopping = getOrInitShoppingVar();
    if (shopping[object][key] == undefined){
        shopping[object][key] = {quantity: 0, price: price, description: description};
        setCache("shopping", shopping);
    }
    
    return shopping[object][key];
}

function setQuantityValue(object, key, value){
    var shopping = getOrInitShoppingVar();
    shopping[object][key]["quantity"] = value;
    setCache("shopping", shopping);
}

function modalDialogue(title, itemArray, options){
    
    if (options == null) {
        options = {};
    }
    //options["closeClass"] = "dialogueClass";
    options["minHeight"] = 300 + itemArray.length*50;
    options["minWidth"] = 450;
    $("#modal-title")[0].innerHTML = title;
    $("#modal-content").empty();
    $("#modal-content").append("<br/><table>");
    $.each(itemArray, function(value, key){
           var value = initOrGetValue("items", key.id, key.price, key.description);
           var numero = "";
           if (value.quantity != 0){
            numero = value.quantity;
           }
           $("#modal-content").append("<tr><td id='"+key.id+"' class='items'>"+key.name+"</td><td class='numbers'><input type='tel' pattern='\d*' min='0' max='99' id='"+ key.id+ "_spinner' value='"+ numero +"' size=2 maxlength=2 class='numero_input' /></td></tr>");
           $("#"+key.id+"_spinner").spinner({
             max: 99,
             min: 0,
             icons: { up: "none", down: "none" }
           });
    });
    $("#modal-content").append("</table>");
    $("#modal-content").append("<br/><p style='text-align: center;'><a href='#' class='btn_aceptar_item' id='" + title.replace(/ /g,'') + "'></a></p>");
    $("#"+title.replace(/ /g,'')).on('click', function(){
                    $.each(itemArray, function(value, key){
                        setQuantityValue("items", key.id, $("#"+key.id+"_spinner")[0].value);
                    });
                    $('#shopping').css("background-image", "url('img/carrito_seleccionado.png')");
                    setTimeout(function(){
                      $.modal.close();
                      $('#shopping').css("background-image", "url('img/carrito.png')");
                    }, 200);
                    
    });
    //$("#modal-alert").css("height", "600px");
    $("#modal-alert").modal(options);
    $(".simplemodal-wrap").css("overflow","");
    $(".numero_input")[0].focus();
}

function contactDialogue(title, options){
    
    if (options == null) {
        options = {};
    }
    //options["closeClass"] = "dialogueClass";
    options["minHeight"] = 700;
    options["minWidth"] = 400;
    $("#modal-title")[0].innerHTML = title;
    $("#modal-content").empty();
    $("#modal-alert").modal(options);
    $(".simplemodal-wrap").css("overflow","");
    $("#name_input").focus();
}

function checkConnection(){
    if (navigator.network.connection.type == Connection.NONE){
        showMessage("Esta aplicación necesita conexión a internet para funcionar");
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
                  
function validatePhone(phone){
    var re = /^\d{8,}$/;
    return re.test(phone);
}

function validateDate(date){
    var re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(date);
}
