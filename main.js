let inn = -1;
let out = -1;
let year = -1;


$("#ham").click(function() {
  if ($("#p_sidebar").hasClass("p_off") == 1) {
    $("#p_sidebar").addClass("p_show");
    $("#p_sidebar").removeClass("p_off");
  } else {
    if ($("#p_sidebar").hasClass("p_off") == 0) {
      $("#p_sidebar").addClass("p_off");
      $("#p_sidebar").removeClass("p_show");
    }
  }
});

$("input[name *= 'select']").click(function() {
  $(".p_select-btn-show").addClass("d-none");
  $(".p_select-btn-extend").removeClass("d-none");
});

$("input[name *= 'submit']").click(function() {
  if (inn == -1 || out == -1 || year == -1) {
    Swal.fire(
      "查詢卡片失敗", //標題
      "請輸入查詢條件", //訊息內容(可省略)
      "warning" //圖示(可省略) success/info/warning/error/question
      //圖示範例：https://sweetalert2.github.io/#icons
    );
  } else {

    $(".p_select-btn-extend").addClass("d-none");
    $(".p_card_display").css({
      "height": "91%",
      "width": "95%",
      "margin-left": "2.5%",
      "border-radius": "2.2em",

    });
    $(".p_card_display").removeClass("d-none");
    display();
  }
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

$("#p_close").click(function() {

  $(".p_card_display").addClass("d-none");
  $(".p_select-btn-show").removeClass("d-none");
  $("#p_in_less1,#p_in_bigger1,#p_in_bigger25,#p_out_less2,#p_out_bigger2,#p_y_none, #p_y_less3, #p_y_bigger3, #p_mastercard, #p_visa, #p_ae, #p_jcb ").css({
    "background-color": "#2B2D34",
    "color": "white"
  });
  inn = -1;
  out = -1;
  year = -1;



});

function display() {

  let bank = $("#p_bank-option-content").val();
  let aa = $.ajax({
    url: "card_data2.json",
    async: false
  });
  $('#p_list').empty();
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
    list[i] = 0;
    value_in[i] = a[0];
    value_out[i] = b[0];
    if (c[0] == "NT") value_year[i] = c[1];
    else value_year[i] = c[0];
  }

  for (i = 0; i < c_data.name.length; i++) {

    list[i] = 1;

  }



  if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] < 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {
        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }

    }

  } else if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] < 2 && value_year[i] < 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] < 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] >= 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] >= 2 && value_year[i] < 3000 && list[i] == 1) {
        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }
  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] >= 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] < 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] < 2 && value_year[i] < 3000 && list[i] == 1) {
        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] < 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] >= 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] >= 2 && value_year[i] < 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] >= 2 && value_year[i] > 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] < 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] < 2 && value_year[i] < 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] < 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] >= 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] >= 2 && value_year[i] < 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] >= 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  }
  $(".p_card").click(function() {
    let id = $(this).attr("id");
    a = id.split("_", 3);
    id = a[1];
    $(".p_card_list").addClass("d-none");
    $(".p_card_display_header_style").addClass("d-none");
    $(".p_card_display_header").html(c_data.name[id]).css({
      "text-align": "center",
      "color": "white",
      "margin": "2% 0 0% 11%",
      "display": "inline"

    });


  });





}