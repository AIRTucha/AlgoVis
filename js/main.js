var SortVis = require('./SortVis');
var buttons = require('./buttons')
var $ = require('jquery');


//trun on jq-ui
require('jquery-ui');

(function(namespace) {window.onload = function(){
  setLayout();
  createAbout();
  var s = new SortVis(20, 
                      function(a, b) {return a < b;},
                      $('#main').width() * 0.99,
                      $(window).height() * 0.85,
                      200,
                      "#AA0077", 
                      "#DD00AA", 
                      "#00BB00", 
                      "#BB0000", 
                      "#AAAAAA");
  
   var step = 0;
 

  var b = buttons(window.innerHeight*0.04, '#buttons',
     function(obj){
      s.backwardAnimation(function(){
        updataSlider();
        obj.setStop();
      });
     },
     function(){
       s.backwardStep(function(){
       updataSlider(); 
       });
     },
     function(){
        if(s.ifRun())
          s.stop();
        else
          s.reset();
    
        updataSlider();
     },
     function(){
       s.forwardStep(function(){
       updataSlider();
       });
     },
     function(obj){
       s.forwardAnimation(function(){
         updataSlider();
         obj.setStop();
       });
     });
  
   $('#slyder').slider({
      animate: "fast",
      range : "min",
      min : 0,
      max : s.getLogSize(),
      values : 0,
      stop : function( event, ui ) {
        s.intervalAnimation(ui.value);
        b.setReset();
      }
   });
  
  $('#speed').on('change', function () {
    s.setDuration(500-this.value)
    $('#speed_n').text(500-this.value + 'mc');
  });
  $('#sizeSelector').on('change', function () { s.setSize($(this).find('option:selected').val())});
  
  $('#algo').on('change', function () {
    s.setAlgo($(this).find('option:selected').val())
    updataSlider();
  });
  
  
  
  $('.savonia').click(function(){$(".about").fadeIn(500)});
  
    function createAbout(){
    $('body').append('<div class = "about"><div class = "about_content"></div><div class = "about_exit"></div></div>');
    
    $('.about_content').append('<h1>About</h1><br/>' + 
                       '<p>The visualisation is created by <a target = "_blank" href = "https://github.com/AIRTucha">Alexey Tukalo</a> for Advanced Algorithms and Data Structures course at <a target = "_blank" href = "http://portal.savonia.fi/amk/">Savonia University of Applied Sciences</a>.' +
                       '<p>The visualisation represents sevent the most common sorting algorithms and gives user an opportunity to brows thought them in a different way.</p>' +
                      '<p>You are welcome to fork and improve the framework on <a target = "_blank" href = "https://github.com/AIRTucha/SortVis">GitHub</a>.</p>');
      
      $('a').css({'color' : '#AA0077'});
    
      $(".about_exit").click(function(){ $(".about").fadeOut(500)});
      $(".about").hide();
    
  }
 
  
 function updataSlider(){
    $('#slyder').slider( "option", "value", s.getStep()).slider( "option", "max", s.getLogSize());
  }
  
  function setLayout(){
    if(innerHeight*1.3 < innerWidth){
      $("#buttons").removeClass().addClass('uk-width-1-4');
      $("#algo").removeClass().addClass('uk-width-1-4');
      $("#sp").removeClass().addClass('uk-width-1-4');
      $("#size").removeClass().addClass('uk-width-1-4')
    } else{
      $("#buttons").removeClass().addClass('uk-width-1-2');
      $("#algo").removeClass().addClass('uk-width-1-2');
      $("#sp").removeClass().addClass('uk-width-1-2');
      $("#size").removeClass().addClass('uk-width-1-2')
    }
  }
  
  window.onresize = function(){
    s.resize($('#main').width() * 0.99, $(window).height() * 0.85)
    setLayout();
  }
}
})(window);