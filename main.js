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
});