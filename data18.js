// ============================================================
// 分类重组：方便 → 简单菜 + 预制菜
// 预制菜 = 教程中使用料理包/半成品（蛋挞皮、速冻饺子、冷面片、罐头等）
// ============================================================
(function () {
  // 全站使用料理包/半成品的菜
  var premadeList = ['蛋挞', '烤冷面', '酸汤水饺', '豆豉鲮鱼油麦菜', '煎饺'];
  var qi = LUNCH_NEEDS.findIndex(function (n) { return n.id === 'quick'; });
  if (qi >= 0) {
    var quickDishes = LUNCH_NEEDS[qi].dishes.slice();
    LUNCH_NEEDS.splice(qi, 1,
      { id: 'simple', name: '简单菜', icon: '🥬', dishes: quickDishes.filter(function (d) { return premadeList.indexOf(d) < 0; }) },
      { id: 'premade', name: '预制菜', icon: '🥡', dishes: quickDishes.filter(function (d) { return premadeList.indexOf(d) >= 0; }) }
    );
  }
  // 其他分类里的预制菜也收进"预制菜"栏（原分类保留）
  var extra = [];
  LATE_MOODS.forEach(function (m) {
    m.dishes.forEach(function (d) {
      if (premadeList.indexOf(d) >= 0 && extra.indexOf(d) < 0) extra.push(d);
    });
  });
  LUNCH_NEEDS.forEach(function (n) {
    if (n.id === 'premade') return;
    n.dishes.forEach(function (d) {
      if (premadeList.indexOf(d) >= 0 && extra.indexOf(d) < 0) extra.push(d);
    });
  });
  var pm = LUNCH_NEEDS.find(function (n) { return n.id === 'premade'; });
  if (pm) {
    extra.forEach(function (d) {
      if (pm.dishes.indexOf(d) < 0) pm.dishes.push(d);
    });
  }
})();
