let inn;
let out;
let year;



$("input[name *= 'select']").click(function() {
  $(".p_select-btn-show").addClass("d-none");
  $(".p_select-btn-extend").removeClass("d-none");
});

$("input[name *= 'submit']").click(function() {
  $(".p_select-btn-extend").addClass("d-none");
  $(".p_card_display").css({
    "height": "91%",
    "width": "95%",
    "margin-left": "2.5%",
    "border-radius": "2.2em",

  });
  $(".p_card_display").removeClass("d-none");
  display();
});

$("#p_in_less1,#p_in_bigger1,#p_in_bigger25").click(function() {

  $("#p_in_less1").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_in_bigger1").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_in_bigger25").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $(this).css({
    "background-color": "#FFDD00",
    "color": "black"
  });
  inn = $(this).attr("id");
});

$("#p_out_less2,#p_out_bigger2").click(function() {

  $("#p_out_less2").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_out_bigger2").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $(this).css({
    "background-color": "#FFDD00",
    "color": "black"
  });

  out = $(this).attr("id");

});

$("#p_y_none,#p_y_less3,#p_y_bigger3").click(function() {

  $("#p_y_none").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_y_less3").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_y_bigger3").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $(this).css({
    "background-color": "#FFDD00",
    "color": "black"
  });
  year = $(this).attr("id");

});

$("#p_mastercard,#p_visa,#p_ae,#p_jcb").click(function() {

  $("#p_mastercard").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_visa").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_ae").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_jcb").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $(this).css({
    "background-color": "#FFDD00",
    "color": "black"
  });
  // if ($(this).attr("id") == "in_less") in_check = 0;
  // else in_check = 1;
});

function display() {

  let aa = $.ajax({
    url: "card_data2.json",
    async: false
  });
  $('#p_card_display').empty();
  let c_data = aa.responseJSON;


  let count = new Array(c_data.name.length);
  let value_in = new Array(c_data.name.length);
  let value_out = new Array(c_data.name.length);
  let value_year = new Array(c_data.name.length);
  let list = new Array(c_data.name.length);

  for (i = 0; i < c_data.name.length; i++) {
    count[i] = i;
    let a = c_data.v_in[i].split("%", 5);
    let b = c_data.v_out[i].split("%", 5);
    let c = c_data.v_year[i].split("$", 5);
    value_in[i] = a[0];
    value_out[i] = b[0];
    if (c[0] == "NT") value_year[i] = c[1];
    else value_year[i] = c[0];
  }

  if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] < 2 && (value_year == "首年無年費" || value_year == "0")) {
        let a = '<li>' +
          '<div class="p_card_name">' +
          c_data.name + '</div>' +
          '<img class="p_card_img" src="' + c_data.img + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_card_list');
      }

    }

  } else if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_less3") {


  } else if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_bigger3") {


  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_none") {


  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_less3") {


  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_bigger3") {


  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_none") {


  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_less3") {


  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_bigger3") {


  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_none") {


  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_less3") {


  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_bigger3") {


  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_none") {


  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_less3") {


  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_bigger3") {


  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_none") {


  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_less3") {


  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_bigger3") {


  }





}