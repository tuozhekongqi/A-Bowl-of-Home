// ============================================================
// 分类审计修正（data28）
// 原则：① 错类移正 ② 适合多类的菜两类都挂
// ============================================================
(function () {
  function rm(list, d) { const i = list.indexOf(d); if (i >= 0) list.splice(i, 1); }
  function add(list, d) { if (list.indexOf(d) < 0) list.push(d); }

  const xiafan = LUNCH_NEEDS.find(n => n.id === 'xiafan').dishes;
  const light = LUNCH_NEEDS.find(n => n.id === 'light').dishes;
  const fit = LUNCH_NEEDS.find(n => n.id === 'fit').dishes;
  const fancy = LUNCH_NEEDS.find(n => n.id === 'fancy').dishes;
  const simple = LUNCH_NEEDS.find(n => n.id === 'simple').dishes;
  const cheap = LUNCH_NEEDS.find(n => n.id === 'cheap').dishes;
  const zhuiju = LATE_MOODS.find(m => m.id === 'zhuiju').dishes;
  const zhiyu = LATE_MOODS.find(m => m.id === 'zhiyu').dishes;

  // ── 错类移正 ──
  // 下饭（米饭杀手=配饭的菜）：主食类移出
  rm(xiafan, '酸汤水饺');    // 饺子是主食 → 保留 premade
  rm(xiafan, '岐山臊子面');  // 面是主食
  rm(xiafan, '鳝鱼面');      // 面是主食（fancy 已挂）
  rm(xiafan, '潮汕砂锅粥');  // 粥是主食 → 清淡
  // 清淡：煎炸类移出
  rm(light, '煎茄夹');       // 煎炸油大 → 简单
  // 减脂：重油菜移出
  rm(fit, '口水鸡');         // 红油重口 → 下饭
  rm(fit, '素烧鸭');         // 油炸豆皮卷 → 实惠
  // 精致：家常焖饭移出（请客拿不出手）
  rm(fancy, '土豆焖饭');
  rm(fancy, '香菇鸡肉焖饭');
  rm(fancy, '咖喱炒饭');

  // ── 归位 ──
  add(simple, '煎茄夹');
  add(simple, '土豆焖饭');
  add(simple, '香菇鸡肉焖饭');
  add(simple, '咖喱炒饭');
  add(simple, '酸汤水饺');
  add(simple, '岐山臊子面');
  add(xiafan, '口水鸡');
  add(cheap, '素烧鸭');
  add(light, '潮汕砂锅粥');

  // ── 多类菜补挂（两类都有） ──
  add(xiafan, '可乐鸡翅');      // 简单 + 下饭
  add(zhuiju, '毛血旺');        // 下饭 + 追剧夜宵
  add(fancy, '剁椒鱼头');       // 下饭 + 精致（宴客硬菜）
  add(fancy, '清蒸多宝鱼');     // 清淡 + 精致
  add(fancy, '白灼虾');         // 清淡 + 精致
  add(light, '云南汽锅鸡');     // 精致 + 清淡（汤清味鲜）

  // 酸萝卜老鸭汤补挂（清淡）
  add(LUNCH_NEEDS.find(n => n.id === 'light').dishes, '酸萝卜老鸭汤');
})();