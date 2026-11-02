
import type { WordEntry } from "./words-batch-01";

import { wordsBatch01 } from "./words-batch-01";
import { wordsBatch02 } from "./words-batch-02";
import { wordsBatch03 } from "./words-batch-03";
import { wordsBatch04 } from "./words-batch-04";
import { wordsBatch05 } from "./words-batch-05";

type RawWord = readonly [string, string, string];

type WordGroup = {
  topic: string;
  band: string;
  items: RawWord[];
};

const groups: WordGroup[] = [
  {
    topic: "Literature and Reading",
    band: "7+",
    items: [
      ["allegory", "noun", "寓言；讽喻"],
      ["allusion", "noun", "典故；暗指"],
      ["anthology", "noun", "选集；文选"],
      ["aphorism", "noun", "格言；警句"],
      ["archetype", "noun", "原型；典型"],
      ["aside", "noun", "旁白；题外话"],
      ["ballad", "noun", "民谣；叙事诗"],
      ["catharsis", "noun", "情感宣泄；净化"],
      ["chronicle", "noun / verb", "编年史；记录"],
      ["cliché", "noun", "陈词滥调"],
      ["climax", "noun", "高潮；顶点"],
      ["denouement", "noun", "结局；结尾部分"],
      ["dialogue", "noun", "对话；对白"],
      ["elegy", "noun", "挽歌；哀诗"],
      ["epilogue", "noun", "后记；尾声"],
      ["exposition", "noun", "说明；背景交代"],
      ["fable", "noun", "寓言故事"],
      ["flashback", "noun", "倒叙；闪回"],
      ["foreshadowing", "noun", "伏笔；预示"],
      ["irony", "noun", "反讽；讽刺"],
      ["memoir", "noun", "回忆录"],
      ["monologue", "noun", "独白"],
      ["motif", "noun", "主题；反复出现的意象"],
      ["myth", "noun", "神话；错误观念"],
      ["ode", "noun", "颂诗"],
      ["parody", "noun / verb", "戏仿；滑稽模仿"],
      ["plot", "noun", "情节；阴谋"],
      ["prologue", "noun", "序言；开场"],
      ["satire", "noun", "讽刺作品；讽刺"],
      ["soliloquy", "noun", "独白；自言自语"],
      ["suspense", "noun", "悬念；焦虑"],
      ["tragedy", "noun", "悲剧；惨剧"],
      ["viewpoint", "noun", "观点；视角"],
      ["fictional", "adjective", "虚构的"],
      ["nonfiction", "noun", "非虚构作品"],
      ["literary", "adjective", "文学的"],
      ["protagonist", "noun", "主人公；主角"],
      ["antagonist", "noun", "反派；对立者"],
      ["narrative voice", "noun", "叙述声音；叙事视角"],
      ["reading comprehension", "noun", "阅读理解"]
    ]
  },
  {
    topic: "Architecture and Urban Design",
    band: "6.5+",
    items: [
      ["arcade", "noun", "拱廊；游乐场"],
      ["atrium", "noun", "中庭；天井"],
      ["balustrade", "noun", "栏杆；扶手"],
      ["basement", "noun", "地下室"],
      ["facade", "noun", "建筑正面；外观"],
      ["courtyard", "noun", "庭院"],
      ["dome", "noun", "圆顶；穹顶"],
      ["drainage", "noun", "排水系统"],
      ["eaves", "noun", "屋檐"],
      ["elevation", "noun", "立面；海拔"],
      ["entrance", "noun", "入口"],
      ["foyer", "noun", "门厅；前厅"],
      ["framework", "noun", "框架；结构"],
      ["interior", "noun", "内部；室内"],
      ["masonry", "noun", "砖石建筑；砖石工艺"],
      ["mezzanine", "noun", "夹层；夹楼"],
      ["partition", "noun", "隔断；分割"],
      ["pavement", "noun", "人行道；铺面"],
      ["pillar", "noun", "柱子；支柱"],
      ["plumbing", "noun", "管道系统"],
      ["porch", "noun", "门廊"],
      ["roofing", "noun", "屋顶材料；屋面工程"],
      ["staircase", "noun", "楼梯"],
      ["terrace", "noun", "露台；排屋"],
      ["vestibule", "noun", "门廊；前厅"],
      ["walkway", "noun", "人行通道"],
      ["warehouse", "noun", "仓库"],
      ["waterfront", "noun", "滨水区"],
      ["blueprint", "noun", "蓝图；设计方案"],
      ["structural", "adjective", "结构的"],
      ["subdivision", "noun", "细分；住宅区"],
      ["landmark", "noun", "地标；里程碑"],
      ["overpass", "noun", "立交桥；天桥"],
      ["underpass", "noun", "地下通道"],
      ["skyscraper", "noun", "摩天大楼"],
      ["high-rise", "noun / adjective", "高层建筑；高层的"],
      ["low-rise", "noun / adjective", "低层建筑；低层的"],
      ["prefabricated", "adjective", "预制的"],
      ["renovate", "verb", "翻新；修缮"],
      ["retrofitting", "noun", "改造；加装新设备"]
    ]
  },
  {
    topic: "Medicine and Public Health",
    band: "7+",
    items: [
      ["ailment", "noun", "小病；疾病"],
      ["antiseptic", "noun / adjective", "防腐剂；抗菌的"],
      ["asthma", "noun", "哮喘"],
      ["benign", "adjective", "良性的；无害的"],
      ["malignant", "adjective", "恶性的；有害的"],
      ["carcinogen", "noun", "致癌物"],
      ["carcinogenic", "adjective", "致癌的"],
      ["clinical trial", "noun", "临床试验"],
      ["convalescence", "noun", "康复期"],
      ["convalescent", "adjective / noun", "康复中的；康复者"],
      ["epidemiological", "adjective", "流行病学的"],
      ["immunisation", "noun", "免疫接种"],
      ["immunise", "verb", "使免疫；接种疫苗"],
      ["inoculation", "noun", "接种；预防注射"],
      ["inoculate", "verb", "给……接种"],
      ["insomnia", "noun", "失眠"],
      ["insomniac", "noun", "失眠者"],
      ["leukaemia", "noun", "白血病"],
      ["migraine", "noun", "偏头痛"],
      ["neoplasm", "noun", "肿瘤；新生物"],
      ["neonatal", "adjective", "新生儿的"],
      ["paediatric", "adjective", "儿科的"],
      ["paediatrics", "noun", "儿科学"],
      ["prognosis", "noun", "预后；病情预测"],
      ["prognostic", "adjective", "预后的；预测性的"],
      ["remission", "noun", "缓解；减轻"],
      ["relapse", "noun / verb", "复发；故态复萌"],
      ["rehabilitation", "noun", "康复治疗"],
      ["resuscitate", "verb", "使复苏；使恢复知觉"],
      ["resuscitation", "noun", "复苏；心肺复苏"],
      ["sequela", "noun", "后遗症"],
      ["sequelae", "noun", "后遗症（复数）"],
      ["thermometer", "noun", "温度计"],
      ["ulcer", "noun", "溃疡"],
      ["ulcerative", "adjective", "溃疡性的"],
      ["urinary", "adjective", "泌尿的"],
      ["vaccine efficacy", "noun", "疫苗有效性"],
      ["viral load", "noun", "病毒载量"],
      ["outbreak", "noun", "疾病暴发；突发事件"],
      ["quarantine", "noun / verb", "隔离；检疫"]
    ]
  },
  {
    topic: "Law and Criminal Justice",
    band: "7+",
    items: [
      ["accomplice", "noun", "共犯；同谋"],
      ["affidavit", "noun", "宣誓书"],
      ["alibi", "noun", "不在场证明"],
      ["appealable", "adjective", "可上诉的"],
      ["apprehend", "verb", "逮捕；理解"],
      ["apprehension", "noun", "逮捕；忧虑"],
      ["cautionary", "adjective", "警告性的"],
      ["coercion", "noun", "胁迫；强制"],
      ["coercive", "adjective", "强制性的"],
      ["confiscate", "verb", "没收；充公"],
      ["confiscation", "noun", "没收；充公"],
      ["conspiracy", "noun", "阴谋；共谋"],
      ["conspirator", "noun", "共谋者"],
      ["custody", "noun", "拘留；监护"],
      ["custodial", "adjective", "拘留的；监护的"],
      ["deterrence", "noun", "威慑；遏制"],
      ["deterrent", "noun / adjective", "威慑因素；遏制的"],
      ["extrajudicial", "adjective", "法外的；未经司法程序的"],
      ["felony", "noun", "重罪"],
      ["felon", "noun", "重罪犯"],
      ["forgery", "noun", "伪造；伪造罪"],
      ["forger", "noun", "伪造者"],
      ["indictable", "adjective", "可起诉的"],
      ["jurisdictional", "adjective", "司法管辖权的"],
      ["manslaughter", "noun", "过失杀人罪"],
      ["misconduct", "noun", "不当行为；失职"],
      ["misdemeanour", "noun", "轻罪"],
      ["parole", "noun", "假释"],
      ["parolee", "noun", "假释犯"],
      ["perjury", "noun", "伪证罪"],
      ["perjure", "verb", "作伪证"],
      ["probation", "noun", "缓刑；试用期"],
      ["probationary", "adjective", "缓刑期间的；试用期的"],
      ["recidivism", "noun", "累犯；再犯"],
      ["recidivist", "noun", "累犯者"],
      ["restitution", "noun", "赔偿；归还"],
      ["retrieval", "noun", "取回；追回"],
      ["smuggling", "noun", "走私"],
      ["smuggle", "verb", "走私；偷运"],
      ["warrant", "noun / verb", "逮捕令；授权"]
    ]
  },
  {
    topic: "Business and Management",
    band: "6.5+",
    items: [
      ["acquisition cost", "noun", "购置成本；获取成本"],
      ["after-sales", "adjective", "售后的"],
      ["appraisal system", "noun", "绩效评估制度"],
      ["benchmarking", "noun", "基准比较；对标"],
      ["brand loyalty", "noun", "品牌忠诚度"],
      ["brand recognition", "noun", "品牌认知度"],
      ["business ethics", "noun", "商业道德"],
      ["business model", "noun", "商业模式"],
      ["capital gain", "noun", "资本利得"],
      ["cash flow", "noun", "现金流"],
      ["cash reserve", "noun", "现金储备"],
      ["chain store", "noun", "连锁店"],
      ["clientele", "noun", "客户群"],
      ["commission-based", "adjective", "以佣金为基础的"],
      ["competitiveness", "noun", "竞争力"],
      ["consumerism", "noun", "消费主义"],
      ["corporate culture", "noun", "企业文化"],
      ["corporate governance", "noun", "公司治理"],
      ["cost-effective", "adjective", "成本效益高的"],
      ["cost efficiency", "noun", "成本效率"],
      ["downsizing", "noun", "裁员；缩减规模"],
      ["entrepreneurship", "noun", "创业；企业家精神"],
      ["feasibility", "noun", "可行性"],
      ["feasible", "adjective", "可行的"],
      ["franchising", "noun", "特许经营"],
      ["gross margin", "noun", "毛利率"],
      ["incentive scheme", "noun", "激励方案"],
      ["market share", "noun", "市场份额"],
      ["merchandise", "noun / verb", "商品；推销"],
      ["merger", "noun", "合并；兼并"],
      ["merger agreement", "noun", "合并协议"],
      ["outsource", "verb", "外包"],
      ["outsourcing", "noun", "外包"],
      ["overhead", "noun", "管理费用；间接成本"],
      ["retail outlet", "noun", "零售门店"],
      ["shareholder", "noun", "股东"],
      ["stocktaking", "noun", "盘点；清点库存"],
      ["supply chain", "noun", "供应链"],
      ["takeover", "noun", "收购；接管"],
      ["workforce planning", "noun", "人力规划"]
    ]
  },
  {
    topic: "Geography and Natural Processes",
    band: "7+",
    items: [
      ["alluvial", "adjective", "冲积的"],
      ["alluvium", "noun", "冲积层；冲积土"],
      ["altitude", "noun", "海拔；高度"],
      ["altitudinal", "adjective", "海拔的；高度的"],
      ["atmospheric pressure", "noun", "大气压"],
      ["barometer", "noun", "气压计"],
      ["barometric", "adjective", "气压的"],
      ["cavern", "noun", "大洞穴"],
      ["cavernous", "adjective", "洞穴般的；宽敞的"],
      ["coastal erosion", "noun", "海岸侵蚀"],
      ["confluence", "noun", "汇流处；汇合"],
      ["converge", "verb", "汇聚；趋同"],
      ["convergent", "adjective", "汇聚的；趋同的"],
      ["divergence", "noun", "分歧；分流"],
      ["diverge", "verb", "分叉；背离"],
      ["estuary", "noun", "河口；河口湾"],
      ["estuarine", "adjective", "河口的"],
      ["evapotranspiration", "noun", "蒸散作用"],
      ["fluvial", "adjective", "河流的；河成的"],
      ["geomorphology", "noun", "地貌学"],
      ["geomorphological", "adjective", "地貌学的"],
      ["isthmus", "noun", "地峡"],
      ["lagoon", "noun", "泻湖；环礁湖"],
      ["littoral", "adjective / noun", "沿海的；沿岸地区"],
      ["marshland", "noun", "沼泽地"],
      ["marshy", "adjective", "沼泽般的"],
      ["tributary", "noun", "支流"],
      ["tributary", "adjective", "附属的；从属的"],
      ["peninsula", "noun", "半岛"],
      ["peninsular", "adjective", "半岛的"],
      ["precipitation", "noun", "降水；沉淀"],
      ["precipitate", "verb", "使降水；促使发生"],
      ["precipitation rate", "noun", "降水率"],
      ["riparian", "adjective", "河岸的"],
      ["sedimentation", "noun", "沉积作用"],
      ["sedimentology", "noun", "沉积学"],
      ["subterranean", "adjective", "地下的"],
      ["topographic", "adjective", "地形的"],
      ["topographical", "adjective", "地形学的"],
      ["transboundary", "adjective", "跨境的；跨界的"]
    ]
  },
  {
    topic: "Education and Learning",
    band: "6.5+",
    items: [
      ["accreditation body", "noun", "认证机构"],
      ["adult education", "noun", "成人教育"],
      ["apprentice-based", "adjective", "以学徒制为基础的"],
      ["aptitude test", "noun", "能力倾向测验"],
      ["blended learning", "noun", "混合式学习"],
      ["class attendance", "noun", "课堂出勤"],
      ["classroom-based", "adjective", "以课堂为基础的"],
      ["collaborative learning", "noun", "合作学习"],
      ["coursework", "noun", "课程作业"],
      ["credit-bearing", "adjective", "可计学分的"],
      ["distance education", "noun", "远程教育"],
      ["dropout", "noun", "辍学者；退出者"],
      ["drop out", "verb", "辍学；退出"],
      ["educational attainment", "noun", "受教育程度"],
      ["educational institution", "noun", "教育机构"],
      ["educational reform", "noun", "教育改革"],
      ["enrichment programme", "noun", "拓展课程"],
      ["examiner", "noun", "考官；主考人"],
      ["faculty member", "noun", "教职人员"],
      ["feedback loop", "noun", "反馈循环"],
      ["fieldwork", "noun", "实地考察；田野工作"],
      ["graduate employability", "noun", "毕业生就业能力"],
      ["independent study", "noun", "自主学习"],
      ["learning outcome", "noun", "学习成果"],
      ["learning objective", "noun", "学习目标"],
      ["learning pathway", "noun", "学习路径"],
      ["learning disability", "noun", "学习障碍"],
      ["lecture hall", "noun", "演讲厅；阶梯教室"],
      ["literacy rate", "noun", "识字率"],
      ["mentoring", "noun", "指导；辅导"],
      ["multidisciplinary", "adjective", "多学科的"],
      ["open enrolment", "noun", "开放注册"],
      ["peer assessment", "noun", "同伴评价"],
      ["peer learning", "noun", "同伴学习"],
      ["placement test", "noun", "分班测试"],
      ["school leaver", "noun", "毕业离校学生"],
      ["student retention", "noun", "学生留存率"],
      ["teaching method", "noun", "教学方法"],
      ["undergraduate", "noun / adjective", "本科生；本科阶段的"],
      ["work-based learning", "noun", "工作本位学习"]
    ]
  },
  {
    topic: "Research and Critical Thinking",
    band: "7+",
    items: [
      ["abstraction", "noun", "抽象；抽象概念"],
      ["analytical framework", "noun", "分析框架"],
      ["anecdotal evidence", "noun", "轶事证据；个案证据"],
      ["assumption-based", "adjective", "基于假设的"],
      ["axiomatic", "adjective", "公理的；不证自明的"],
      ["bias-free", "adjective", "无偏见的"],
      ["case study", "noun", "案例研究"],
      ["categorisation", "noun", "分类"],
      ["categorise", "verb", "分类"],
      ["coding", "noun", "编码；代码编写"],
      ["conceptual framework", "noun", "概念框架"],
      ["content analysis", "noun", "内容分析"],
      ["counterargument", "noun", "反方论点"],
      ["counterbalance", "verb / noun", "抵消；平衡因素"],
      ["cross-reference", "verb / noun", "交叉引用；参照"],
      ["data collection", "noun", "数据收集"],
      ["data interpretation", "noun", "数据解读"],
      ["data mining", "noun", "数据挖掘"],
      ["deductive reasoning", "noun", "演绎推理"],
      ["descriptive statistics", "noun", "描述性统计"],
      ["dissemination", "noun", "传播；散布"],
      ["disseminate", "verb", "传播；散布"],
      ["epistemology", "noun", "认识论"],
      ["epistemological", "adjective", "认识论的"],
      ["experimental design", "noun", "实验设计"],
      ["external validity", "noun", "外部效度"],
      ["internal validity", "noun", "内部效度"],
      ["grounded theory", "noun", "扎根理论"],
      ["inductive reasoning", "noun", "归纳推理"],
      ["longitudinal study", "noun", "纵向研究"],
      ["meta-analysis", "noun", "元分析"],
      ["mixed methods", "noun", "混合研究方法"],
      ["operational definition", "noun", "操作性定义"],
      ["peer evaluator", "noun", "同行评估者"],
      ["replicability", "noun", "可重复性"],
      ["replicable", "adjective", "可重复的"],
      ["research design", "noun", "研究设计"],
      ["research instrument", "noun", "研究工具"],
      ["research ethics", "noun", "研究伦理"],
      ["triangulation", "noun", "三角验证法；多源验证"]
    ]
  },
  {
    topic: "Food and Agriculture",
    band: "6.5+",
    items: [
      ["adulteration", "noun", "掺假； adulteration"],
      ["adulterate", "verb", "掺假； adulterate"],
      ["agrochemical", "noun", "农用化学品"],
      ["agronomist", "noun", "农学家"],
      ["animal husbandry", "noun", "畜牧业"],
      ["apiculture", "noun", "养蜂业"],
      ["apiary", "noun", "养蜂场"],
      ["aquaponics", "noun", "鱼菜共生"],
      ["arboriculture", "noun", "树木栽培学"],
      ["arborist", "noun", "树艺师；树木养护专家"],
      ["biodynamic", "adjective", "生物动力农业的"],
      ["biofortification", "noun", "生物强化"],
      ["biofortify", "verb", "进行生物强化"],
      ["crop diversification", "noun", "作物多样化"],
      ["crop failure", "noun", "歉收；作物歉收"],
      ["cultivar", "noun", "栽培品种"],
      ["dairy product", "noun", "乳制品"],
      ["foodborne", "adjective", "食源性的"],
      ["food preservation", "noun", "食品保存"],
      ["food traceability", "noun", "食品可追溯性"],
      ["forage", "noun / verb", "饲料；觅食"],
      ["forage crop", "noun", "饲料作物"],
      ["grain yield", "noun", "谷物产量"],
      ["green manure", "noun", "绿肥"],
      ["hydroponics", "noun", "水培"],
      ["hydroponic", "adjective", "水培的"],
      ["intercropping", "noun", "间作；套种"],
      ["intercrop", "verb", "间作；套种"],
      ["monocropping", "noun", "单一种植"],
      ["mulching", "noun", "覆盖栽培"],
      ["mulch", "noun / verb", "覆盖物；覆盖土壤"],
      ["organic fertiliser", "noun", "有机肥料"],
      ["permaculture", "noun", "永续农业"],
      ["perennial crop", "noun", "多年生作物"],
      ["pollination", "noun", "授粉"],
      ["pollinator", "noun", "传粉者"],
      ["pollinate", "verb", "授粉"],
      ["precision agriculture", "noun", "精准农业"],
      ["seedling", "noun", "幼苗"],
      ["soil amendment", "noun", "土壤改良剂"]
    ]
  },
  {
    topic: "Culture and Society",
    band: "7+",
    items: [
      ["acculturation", "noun", "文化适应；文化融合"],
      ["acculturate", "verb", "使适应另一种文化"],
      ["assimilationist", "noun / adjective", "同化主义者；同化主义的"],
      ["collectivism", "noun", "集体主义"],
      ["collectivist", "noun / adjective", "集体主义者；集体主义的"],
      ["cultural appropriation", "noun", "文化挪用"],
      ["cultural assimilation", "noun", "文化同化"],
      ["cultural relativism", "noun", "文化相对主义"],
      ["cultural transmission", "noun", "文化传承"],
      ["cultural norm", "noun", "文化规范"],
      ["cultural heritage", "noun", "文化遗产"],
      ["cultural identity", "noun", "文化身份"],
      ["cultural preservation", "noun", "文化保护"],
      ["cultural sensitivity", "noun", "文化敏感性"],
      ["cultural stereotype", "noun", "文化刻板印象"],
      ["customary", "adjective", "习惯上的；惯常的"],
      ["customarily", "adverb", "照惯例；通常"],
      ["diaspora", "noun", "离散群体；散居"],
      ["diasporic", "adjective", "离散群体的"],
      ["ethnocentrism", "noun", "民族中心主义"],
      ["ethnocentric", "adjective", "民族中心主义的"],
      ["folkloric", "adjective", "民俗的；民间传说的"],
      ["indigenous", "adjective", "本土的；原住民的"],
      ["indigeneity", "noun", "原住民身份；本土性"],
      ["intercultural", "adjective", "跨文化的"],
      ["intergenerational", "adjective", "代际之间的"],
      ["kinship", "noun", "亲属关系；亲缘关系"],
      ["kinship network", "noun", "亲属网络"],
      ["material culture", "noun", "物质文化"],
      ["oral tradition", "noun", "口述传统"],
      ["patriarchy", "noun", "父权制"],
      ["patriarchal", "adjective", "父权制的"],
      ["ritualistic", "adjective", "仪式性的"],
      ["ritualise", "verb", "使仪式化"],
      ["social convention", "noun", "社会惯例"],
      ["social norm", "noun", "社会规范"],
      ["subculture", "noun", "亚文化"],
      ["subcultural", "adjective", "亚文化的"],
      ["tradition-bound", "adjective", "受传统约束的"],
      ["transcultural", "adjective", "跨文化的"]
    ]
  }
];

let nextId = 2637;

export const wordsBatch06: WordEntry[] = groups.flatMap((group) =>
  group.items.map(([word, pos, zh]) => ({
    id: nextId++,
    word,
    pos,
    zh,
    topic: group.topic,
    band: group.band
  }))
);

// 数量检查：只提示，不阻止网站运行。
if (wordsBatch06.length !== 400) {
  console.warn(
    `[Batch 06] 预期 400 个词，实际生成 ${wordsBatch06.length} 个。`
  );
}

// 检查本批次内部重复。
const batch06Words = wordsBatch06.map((item) => item.word.toLowerCase());
const batch06Unique = new Set(batch06Words);

if (batch06Unique.size !== batch06Words.length) {
  const duplicates = batch06Words.filter(
    (word, index) => batch06Words.indexOf(word) !== index
  );

  console.warn("[Batch 06] 本批次存在重复词：", [...new Set(duplicates)]);
}

// 检查与前五批的重复。
const previousWords = [
  ...wordsBatch01,
  ...wordsBatch02,
  ...wordsBatch03,
  ...wordsBatch04,
  ...wordsBatch05
].map((item) => item.word.toLowerCase());

const previousWordSet = new Set(previousWords);

const repeatedPrevious = batch06Words.filter((word) =>
  previousWordSet.has(word)
);

if (repeatedPrevious.length > 0) {
  console.warn(
    "[Batch 06] 与前五批重复的词：",
    [...new Set(repeatedPrevious)]
  );
}

// 检查 ID 是否连续。
const expectedLastId = 2637 + wordsBatch06.length - 1;

if (
  wordsBatch06[0]?.id !== 2637 ||
  wordsBatch06[wordsBatch06.length - 1]?.id !== expectedLastId
) {
  console.warn("[Batch 06] ID 编号检查未通过。");
}

console.log(
  `[Batch 06] 已载入 ${wordsBatch06.length} 个词，ID：2637–${expectedLastId}`
);
