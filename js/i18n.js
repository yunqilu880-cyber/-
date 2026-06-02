/**
 * 智慧农业集成平台 - 国际化 (i18n)
 * 支持中文 (zh) 和 English (en)
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'chase_lang';
  
  // ==========================================
  // 翻译字典
  // ==========================================
  const dict = {
    // ---- 通用导航 ----
    'nav.home': { zh: '首页', en: 'Home' },
    'nav.monitor': { zh: '种植助手', en: 'Farm Monitor' },
    'nav.shop': { zh: '电商直销', en: 'Farm Shop' },
    'nav.logistics': { zh: '物流协同', en: 'Logistics' },
    'nav.login': { zh: '登录/注册', en: 'Login/Register' },
    'nav.logout': { zh: '退出', en: 'Logout' },
    'nav.back': { zh: '返回首页', en: 'Back to Home' },
    'nav.back_main': { zh: '← 返回主页面', en: '← Back to Main' },
    'brand.name': { zh: '智慧农业', en: 'SmartAgri' },

    // ---- 首页 index.html ----
    'home.title': { zh: '智慧农业', en: 'Smart Agriculture' },
    'home.subtitle': { zh: '科技赋能农业，数据驱动未来', en: 'Tech-empowered agriculture, data-driven future' },
    'home.btn_monitor': { zh: '查看监测方案', en: 'View Monitoring' },
    'home.btn_learn': { zh: '了解更多', en: 'Learn More' },
    'home.video_title': { zh: '什么是智慧农业集成平台？', en: 'What is the SmartAgri Platform?' },
    'home.video_subtitle': { zh: '观看平台介绍视频', en: 'Watch the introduction video' },
    'home.video_fallback': { zh: '您的浏览器不支持视频播放', en: 'Your browser does not support video playback' },
    'home.services_title': { zh: '核心功能', en: 'Core Features' },
    'home.services_subtitle': { zh: '「1 平台 + 3 模块」轻量级助农方案', en: '"1 Platform + 3 Modules" lightweight farm support solution' },
    'home.service_1_title': { zh: '种植助手', en: 'Farm Monitor' },
    'home.service_1_desc': { zh: 'ESP32 低成本 IoT 监测 + AI 采收建议，单户投入仅 60 元，帮助梅农把握最佳采收窗口，告别"靠天收"。', en: 'Low-cost ESP32 IoT monitoring + AI harvest advice. Only ¥60 per household. Help farmers capture the optimal harvest window.' },
    'home.service_1_link': { zh: '了解监测方案', en: 'Learn More' },
    'home.service_2_title': { zh: '电商直销', en: 'Direct E-Commerce' },
    'home.service_2_desc': { zh: '微信小程序 + 大学生直播矩阵，打通产地到消费者直销渠道，让农户获得更高售价，消费者获得更新鲜的产品。', en: 'WeChat Mini Program + student live-streaming network, connecting farms directly to consumers for better prices and fresher produce.' },
    'home.service_2_link': { zh: '了解电商方案', en: 'Learn More' },
    'home.service_3_title': { zh: '物流协同', en: 'Logistics' },
    'home.service_3_desc': { zh: '村级集单 + 简易保鲜方案，单件成本仅 3-5 元，保鲜期延长至 3-4 天，覆盖次日达配送需求。', en: 'Village-level consolidation + simple preservation. Only ¥3-5 per order. Extends freshness to 3-4 days for next-day delivery coverage.' },
    'home.service_3_link': { zh: '了解物流方案', en: 'Learn More' },
    'home.fusion_title': { zh: '科技与农业的融合', en: 'Tech & Agriculture Integration' },
    'home.fusion_subtitle': { zh: '让传统杨梅产业插上科技的翅膀', en: 'Empowering traditional bayberry farming with technology' },
    'home.fusion_p1': { zh: '余姚素有"中国杨梅之乡"之称，杨梅种植面积约 10 万亩，年产量约 3 万吨。我们致力于将物联网、大数据等前沿技术与杨梅产业深度融合，为散户梅农提供用得起、用得上的数字化解决方案。', en: 'Yuyao is known as the "Home of Chinese Bayberry" with ~100,000 mu of planting area and ~30,000 tons annual output. We integrate IoT, big data, and cutting-edge tech with the bayberry industry to provide affordable digital solutions for smallholder farmers.' },
    'home.fusion_p2': { zh: '从种植端的精准采收建议，到销售端的产地直供渠道，我们覆盖杨梅产业链关键环节，帮助梅农实现"种得好、卖得上价"。', en: 'From precision harvest advice on the farming side to direct-to-consumer sales channels, we cover the key links of the bayberry supply chain—helping farmers grow better and sell higher.' },
    'home.feat_1_title': { zh: '低成本 IoT', en: 'Low-Cost IoT' },
    'home.feat_1_desc': { zh: 'ESP32 + 土壤传感器方案，单户投入仅 60 元，是传统方案的 1/50，让散户梅农零门槛参与数字化。', en: 'ESP32 + soil sensor solution. Only ¥60 per household—1/50 the cost of traditional systems. Zero-barrier digital adoption for small farmers.' },
    'home.feat_2_title': { zh: '智能预警', en: 'Smart Alerts' },
    'home.feat_2_desc': { zh: '基于积温模型 + 土壤湿度阈值，微信服务通知推送采收建议，帮助梅农把握 3-5 天最佳采收窗口。', en: 'Based on accumulated temperature models + soil moisture thresholds, WeChat push notifications deliver harvest advice to help farmers capture the 3-5 day optimal harvest window.' },
    'home.feat_3_title': { zh: '数据闭环', en: 'Data Loop' },
    'home.feat_3_desc': { zh: '种植端 IoT 数据与销售端消费数据互通，从"种什么卖什么"转变为"卖什么种什么"，实现 C2B 反向定制。', en: 'Farm-side IoT data integrated with sales-side consumer data. Shift from "sell what you grow" to "grow what sells"—enabling C2B reverse customization.' },
    'home.feat_4_title': { zh: '三方协作模式', en: 'Tripartite Model' },
    'home.feat_4_desc': { zh: '高校技术供给 + 村集体组织协调 + 农户参与受益，轻资产模型可快速复制至其他乡镇或品类。', en: 'University tech supply + village collective coordination + farmer participation. This asset-light model can be quickly replicated to other towns or crop categories.' },
    'home.coop_title': { zh: '合作模式', en: 'Cooperation Model' },
    'home.coop_subtitle': { zh: '高校 × 村集体 × 农户，三方协作共赢', en: 'University × Village × Farmer — win-win collaboration' },
    'home.coop_desc': { zh: '项目采用轻资产协作模型：高校提供技术开发和电商运营能力，村集体提供组织协调和信任背书，农户提供产品和劳动力。三方各司其职，无需自建重资产，可快速复制。', en: 'The project uses an asset-light collaboration model: universities provide tech & e-commerce capabilities; village collectives provide coordination & trust; farmers provide products & labor. Each party plays its role—no heavy assets needed, rapidly replicable.' },
    'home.coop_1': { zh: '60 元低成本 IoT 设备，降低 90% 以上技术门槛', en: '¥60 low-cost IoT device, reduces tech barrier by 90%+' },
    'home.coop_2': { zh: '微信小程序直销渠道，农户直供，去中间化', en: 'WeChat Mini Program direct sales—farm-to-consumer, cutting out middlemen' },
    'home.coop_3': { zh: '村级集单点 + 简易保鲜方案，降低物流成本 30%', en: 'Village consolidation + simple preservation, reducing logistics costs by 30%' },
    'home.coop_4': { zh: '首期试点 1 村 5-10 户，验证后逐步推广', en: 'Pilot: 1 village × 5-10 households, scale after validation' },
    'home.team_title': { zh: '核心团队', en: 'Core Team' },
    'home.team_subtitle': { zh: '浙江工商大学跨学科团队，能力互补', en: 'Zhejiang Gongshang University interdisciplinary team' },
    'home.team_1_name': { zh: '陆云琪', en: 'Lu Yunqi' },
    'home.team_1_role': { zh: '项目负责人', en: 'Project Lead' },
    'home.team_2_name': { zh: '李继', en: 'Li Ji' },
    'home.team_2_role': { zh: '嵌入式开发工程师', en: 'Embedded Engineer' },
    'home.team_3_name': { zh: '谢安东', en: 'Xie Andong' },
    'home.team_3_role': { zh: '小程序前端开发', en: 'Frontend Developer' },
    'home.team_4_name': { zh: '胡杨', en: 'Hu Yang' },
    'home.team_4_role': { zh: '新媒体运营', en: 'Social Media Ops' },
    'home.team_5_name': { zh: '张钦淏', en: 'Zhang Qinhao' },
    'home.team_5_role': { zh: '视觉设计与内容制作', en: 'Visual Design & Content' },
    'home.team_6_name': { zh: '吴亦枫', en: 'Wu Yifeng' },
    'home.team_6_role': { zh: '市场调研与财务分析', en: 'Market Research & Finance' },
    'home.advisor': { zh: '指导老师：董黎刚', en: 'Advisor: Prof. Dong Ligang' },
    'home.cases_title': { zh: '应用案例', en: 'Case Studies' },
    'home.cases_subtitle': { zh: '我们的成功实践', en: 'Our successful practices' },
    'home.contact_title': { zh: '合作咨询', en: 'Partnership Inquiry' },
    'home.contact_subtitle': { zh: '如果您是杨梅产区村委、合作社或意向合作农户，欢迎联系我们', en: 'If you are a village committee, cooperative, or interested farmer from a bayberry region, please contact us' },
    'home.contact_name': { zh: '您的姓名', en: 'Your Name' },
    'home.contact_phone': { zh: '联系方式', en: 'Contact Info' },
    'home.contact_submit': { zh: '提交', en: 'Submit' },
    'home.biz_title': { zh: '商业模式', en: 'Business Model' },
    'home.biz_subtitle': { zh: '三种收入来源覆盖运营成本，实现可持续造血', en: 'Three revenue streams cover operating costs for sustainable growth' },
    'home.biz_1_badge': { zh: '品牌联名', en: 'Branded Boxes' },
    'home.biz_1_title': { zh: '杨梅礼盒直销', en: 'Bayberry Gift Boxes' },
    'home.biz_1_1': { zh: '统一视觉品牌包装设计', en: 'Unified branded packaging design' },
    'home.biz_1_2': { zh: '产地故事 + 品质分级标准', en: 'Origin story + quality grading standards' },
    'home.biz_1_3': { zh: '3斤装终端售价 80-120 元', en: '1.5kg box retailing at ¥80-120' },
    'home.biz_1_4': { zh: '平台差价分润，农户增收', en: 'Platform margin sharing, farmer income boost' },
    'home.biz_2_badge': { zh: '直播带货', en: 'Live Commerce' },
    'home.biz_2_title': { zh: '自然佣金收益', en: 'Commission Revenue' },
    'home.biz_2_1': { zh: '抖音 + 视频号双平台', en: 'Douyin + WeChat Channels dual-platform' },
    'home.biz_2_2': { zh: '每 2 周 1 场原产地溯源直播', en: '1 origin-tracing livestream every 2 weeks' },
    'home.biz_2_3': { zh: '大学生团队内容创作', en: 'Student team content creation' },
    'home.biz_2_4': { zh: '平台自带佣金机制，零额外成本', en: 'Platform commission built-in, zero extra cost' },
    'home.biz_3_badge': { zh: 'B端服务', en: 'B2B Services' },
    'home.biz_3_title': { zh: '企业采购对接', en: 'Corporate Procurement' },
    'home.biz_3_1': { zh: '校内食堂 + 学校工会福利', en: 'Campus cafeterias + staff union benefits' },
    'home.biz_3_2': { zh: '企事业单位节日采购对接', en: 'Holiday procurement for enterprises' },
    'home.biz_3_3': { zh: '单次采购额 5,000-20,000 元', en: 'Per-order value ¥5,000-20,000' },
    'home.biz_3_4': { zh: '收取 3%-5% 对接服务费', en: '3%-5% service fee' },
    'home.biz_detail': { zh: '了解详情', en: 'Details' },
    'home.join_title': { zh: '加入我们', en: 'Join Us' },
    'home.join_subtitle': { zh: '让每一颗杨梅都卖出好价钱', en: 'Let every bayberry sell at a fair price' },
    'home.join_btn': { zh: '查看监测方案', en: 'View Monitoring' },
    'home.footer_copyright': { zh: '版权所有 © 2026 智慧农业集成平台', en: 'Copyright © 2026 SmartAgri Platform' },
    'home.footer_contact': { zh: '联系我们', en: 'Contact Us' },
    'home.footer_terms': { zh: '服务条款', en: 'Terms of Service' },
    'home.footer_privacy': { zh: '隐私政策', en: 'Privacy Policy' },

    // ---- 智能监测 monitor.html ----
    'monitor.title': { zh: '智能监测中心', en: 'Smart Monitoring Center' },
    'monitor.subtitle': { zh: 'ESP32 实时土壤湿度 & 温度监测', en: 'ESP32 Real-time Soil Moisture & Temperature' },
    'monitor.disconnected': { zh: '未连接', en: 'Disconnected' },
    'monitor.connected': { zh: '已连接', en: 'Connected' },
    'monitor.demo_mode': { zh: '演示模式', en: 'Demo Mode' },
    'monitor.device_title': { zh: '设备连接', en: 'Device Connection' },
    'monitor.device_subtitle': { zh: '连接到您的 ESP32 设备', en: 'Connect to your ESP32 device' },
    'monitor.serial_title': { zh: 'USB 串口连接', en: 'USB Serial Connection' },
    'monitor.serial_desc': { zh: '通过 USB 数据线直连 ESP32，使用 Web Serial API', en: 'Connect ESP32 via USB cable using Web Serial API' },
    'monitor.serial_connect': { zh: '连接串口', en: 'Connect Serial' },
    'monitor.serial_disconnect': { zh: '断开连接', en: 'Disconnect' },
    'monitor.baud_label': { zh: '波特率：', en: 'Baud Rate:' },
    'monitor.wifi_title': { zh: 'WiFi 连接', en: 'WiFi Connection' },
    'monitor.wifi_desc': { zh: '通过局域网 WebSocket 连接 ESP32', en: 'Connect ESP32 via LAN WebSocket' },
    'monitor.wifi_connect': { zh: '连接 WebSocket', en: 'Connect WebSocket' },
    'monitor.wifi_disconnect': { zh: '断开连接', en: 'Disconnect' },
    'monitor.demo_title': { zh: '演示模式', en: 'Demo Mode' },
    'monitor.demo_desc': { zh: '无需硬件，使用模拟数据进行演示', en: 'No hardware needed—simulated data demo' },
    'monitor.demo_start': { zh: '启动演示', en: 'Start Demo' },
    'monitor.demo_stop': { zh: '停止演示', en: 'Stop Demo' },
    'monitor.data_title': { zh: '实时监测数据', en: 'Real-Time Monitoring Data' },
    'monitor.data_subtitle': { zh: '传感器数据实时更新', en: 'Sensor data real-time updates' },
    'monitor.humidity': { zh: '土壤湿度', en: 'Soil Moisture' },
    'monitor.temperature': { zh: '土壤温度', en: 'Soil Temperature' },
    'monitor.waiting': { zh: '等待数据...', en: 'Waiting for data...' },
    'monitor.chart_title': { zh: '历史数据趋势', en: 'Historical Data Trends' },
    'monitor.log_title': { zh: '数据日志', en: 'Data Log' },
    'monitor.log_empty': { zh: '等待设备连接和数据传输...', en: 'Waiting for device connection and data...' },
    'monitor.clear_log': { zh: '清空日志', en: 'Clear Log' },
    'monitor.wiring_title': { zh: 'ESP32 接线指南', en: 'ESP32 Wiring Guide' },
    'monitor.wiring_subtitle': { zh: '硬件连接与配置说明', en: 'Hardware connection & configuration' },
    'monitor.wiring_table': { zh: '传感器接线', en: 'Sensor Wiring' },
    'monitor.firmware_title': { zh: '固件协议说明', en: 'Firmware Protocol' },
    'monitor.firmware_desc': { zh: 'ESP32 需烧录固件，通过串口以 JSON 格式每秒发送数据：', en: 'ESP32 must be flashed with firmware that sends JSON data every second via serial:' },
    'monitor.firmware_ws': { zh: '或通过 WebSocket 在端口 81 上广播相同格式的 JSON 数据。', en: 'Or broadcast the same JSON format over WebSocket on port 81.' },
    'monitor.footer': { zh: '版权所有 © 2026 智慧农业集成平台 - 智能监测中心', en: 'Copyright © 2026 SmartAgri Platform - Monitoring Center' },

    // ---- 物流协同 logistics.html ----
    'logistics.title': { zh: '物流协同', en: 'Logistics' },
    'logistics.subtitle': { zh: '村级集单 + 简易保鲜，让杨梅跑得更远', en: 'Village consolidation + simple preservation—sending bayberries farther' },
    'logistics.flow_title': { zh: '物流流程', en: 'Logistics Flow' },
    'logistics.flow_subtitle': { zh: '从枝头到舌尖，48 小时新鲜直达', en: 'From branch to table—48-hour fresh delivery' },
    'logistics.step1_title': { zh: '清晨采摘', en: 'Morning Harvest' },
    'logistics.step1_desc': { zh: '农户清晨 5-7 点采摘，避开高温时段，确保果实硬度与新鲜度', en: 'Farmers harvest 5-7 AM to avoid peak heat, ensuring fruit firmness and freshness' },
    'logistics.step2_title': { zh: '村级集单', en: 'Village Consolidation' },
    'logistics.step2_desc': { zh: '上午 9 点前送至村委会集单点，统一分拣、称重、打包', en: 'Deliver to village consolidation point before 9 AM for unified sorting, weighing, and packing' },
    'logistics.step3_title': { zh: '保鲜包装', en: 'Preservation Packing' },
    'logistics.step3_desc': { zh: '冰袋 + 泡沫箱 + 吸水纸，单件成本 3-5 元，保鲜期延长至 3-4 天', en: 'Ice packs + foam boxes + absorbent paper. ¥3-5/order, extends freshness to 3-4 days' },
    'logistics.step4_title': { zh: '快递发运', en: 'Express Shipping' },
    'logistics.step4_desc': { zh: '对接菜鸟乡村 / 顺丰，争取农产品优惠价，批量发货降低成本', en: 'Partner with Cainiao Rural / SF Express for agricultural discount rates, bulk shipping to reduce costs' },
    'logistics.cost_title': { zh: '成本与时效', en: 'Cost & Delivery Time' },
    'logistics.cost_subtitle': { zh: '用最低的成本，跑赢最短的保鲜期', en: 'Lowest cost to beat the shortest shelf life' },
    'logistics.preservation_title': { zh: '保鲜方案', en: 'Preservation Solution' },
    'logistics.preservation_cost': { zh: ' 元/单', en: ' /order' },
    'logistics.mat_header': { zh: '材料/用途/单价', en: 'Material/Purpose/Price' },
    'logistics.mat_foam': { zh: '泡沫箱', en: 'Foam Box' },
    'logistics.mat_foam_use': { zh: '保温隔热 + 防震', en: 'Insulation + shock protection' },
    'logistics.mat_ice': { zh: '冰袋', en: 'Ice Pack' },
    'logistics.mat_ice_use': { zh: '降温保鲜', en: 'Cooling & preservation' },
    'logistics.mat_paper': { zh: '吸水纸', en: 'Absorbent Paper' },
    'logistics.mat_paper_use': { zh: '吸收冷凝水', en: 'Absorb condensation' },
    'logistics.mat_tape': { zh: '包装胶带', en: 'Packing Tape' },
    'logistics.mat_tape_use': { zh: '密封固定', en: 'Sealing & fixing' },
    'logistics.preservation_note': { zh: '保鲜期从常温 1-2 天延长至 3-4 天，覆盖次日达配送范围', en: 'Extends shelf life from 1-2 days (room temp) to 3-4 days, covering next-day delivery zones' },
    'logistics.delivery_title': { zh: '配送时效', en: 'Delivery Times' },
    'logistics.delivery_badge': { zh: '次日达 覆盖', en: 'Next-Day Coverage' },
    'logistics.del_nb': { zh: '宁波市区', en: 'Ningbo City' },
    'logistics.del_hz': { zh: '杭州/上海', en: 'Hangzhou/Shanghai' },
    'logistics.del_nj': { zh: '南京/合肥', en: 'Nanjing/Hefei' },
    'logistics.del_other': { zh: '其他地区', en: 'Other Regions' },
    'logistics.del_nextday': { zh: '次日达', en: 'Next-Day' },
    'logistics.del_2day': { zh: '隔日达', en: '2-Day' },
    'logistics.del_3day': { zh: '2-3 天', en: '2-3 Days' },
    'logistics.del_note': { zh: '村级集单批量发货，单件物流成本降低约 30%', en: 'Village consolidation bulk shipping reduces per-order logistics cost by ~30%' },
    'logistics.disclaimer': { zh: '明确不做：自建冷链物流、真空预冷设备等重资产投入。采用与现有快递网络合作的轻资产模式，降低启动门槛。', en: 'We do NOT: build our own cold chain, vacuum pre-cooling, or other heavy assets. We use an asset-light model partnering with existing express networks.' },
    'logistics.why_title': { zh: '为什么选择村级集单？', en: 'Why Village Consolidation?' },
    'logistics.why_subtitle': { zh: '散户单打独斗的物流困境', en: 'The logistics dilemma for individual farmers' },
    'logistics.why_p1': { zh: '单个农户发货面临两大难题：一是快递不上门取件，二是单件价格太高。以余姚到上海为例，个人寄一箱杨梅的快递费约 25 元，而批量发货可降至 15 元以下。', en: 'Individual farmers face two challenges: couriers won\'t pick up from remote farms, and per-order pricing is too high. For example, Yuyao→Shanghai: ~¥25 per box individually, dropping to under ¥15 with bulk shipping.' },
    'logistics.why_p2': { zh: '我们在村委会或合作农户家设立临时代发点，农户将当日采摘的杨梅统一送至集单点，由团队安排批量发货。统一包装、统一品控、统一发货，既降低了成本，又提升了消费者体验。', en: 'We set up temporary dispatch points at village committees or partner farmhouses. Farmers deliver daily harvests to the consolidation point for unified packing, quality control, and bulk shipping—reducing costs and improving the consumer experience.' },
    'logistics.partner_title': { zh: '合作快递伙伴', en: 'Express Partners' },
    'logistics.partner_subtitle': { zh: '对接现有物流网络，不重复造轮子', en: 'Leveraging existing logistics networks' },
    'logistics.partner_1': { zh: '菜鸟乡村', en: 'Cainiao Rural' },
    'logistics.partner_1_desc': { zh: '农产品寄件优惠方案', en: 'Agricultural shipping discounts' },
    'logistics.partner_2': { zh: '顺丰速运', en: 'SF Express' },
    'logistics.partner_2_desc': { zh: '乡镇覆盖 + 冷链方案', en: 'Town coverage + cold chain' },
    'logistics.partner_3': { zh: '京东物流', en: 'JD Logistics' },
    'logistics.partner_3_desc': { zh: '产地直发专项服务', en: 'Origin-direct shipping service' },
    'logistics.contact_title': { zh: '物流合作咨询', en: 'Logistics Partnership Inquiry' },
    'logistics.contact_subtitle': { zh: '如果您是快递企业或有冷链资源，欢迎与我们合作', en: 'If you are an express company or have cold chain resources, we welcome partnership' },
    'logistics.footer': { zh: '版权所有 © 2026 智慧农业集成平台 - 物流协同', en: 'Copyright © 2026 SmartAgri Platform - Logistics' },

    // ---- 登录注册 login.html ----
    'login.tab_login': { zh: '登录', en: 'Login' },
    'login.tab_register': { zh: '注册', en: 'Register' },
    'login.welcome': { zh: '欢迎回来', en: 'Welcome Back' },
    'login.desc': { zh: '登录您的智慧农业账户', en: 'Log in to your SmartAgri account' },
    'login.username': { zh: '账号', en: 'Username' },
    'login.username_ph': { zh: '请输入账号', en: 'Enter username' },
    'login.password': { zh: '密码', en: 'Password' },
    'login.password_ph': { zh: '请输入密码', en: 'Enter password' },
    'login.btn_login': { zh: '登 录', en: 'Login' },
    'login.btn_logging': { zh: '登录中...', en: 'Logging in...' },
    'login.register_title': { zh: '创建账户', en: 'Create Account' },
    'login.register_desc': { zh: '加入智慧农业，享受产地直供', en: 'Join SmartAgri for farm-direct produce' },
    'login.register_name': { zh: '昵称（可选）', en: 'Nickname (optional)' },
    'login.register_name_ph': { zh: '请输入昵称（可选）', en: 'Enter nickname (optional)' },
    'login.btn_register': { zh: '注 册', en: 'Register' },
    'login.btn_registering': { zh: '注册中...', en: 'Registering...' },
    'login.back': { zh: '← 返回首页', en: '← Back to Home' },
    'login.err_required': { zh: '请填写账号和密码', en: 'Please enter username and password' },
    'login.err_login_fail': { zh: '登录失败', en: 'Login failed' },
    'login.err_network': { zh: '网络错误，请重试', en: 'Network error, please retry' },
    'login.err_register_fail': { zh: '注册失败', en: 'Registration failed' },

    // ---- 电商商城 shop.html ----
    'shop.hero_title': { zh: '🛒 电商直销', en: '🛒 Farm Direct Shop' },
    'shop.hero_subtitle': { zh: '产地直供，新鲜到家', en: 'Farm-direct, fresh to your door' },
    'shop.search_ph': { zh: '搜索农产品...', en: 'Search produce...' },
    'shop.search_btn': { zh: '搜索', en: 'Search' },
    'shop.all_cat': { zh: '全部', en: 'All' },
    'shop.cat_1': { zh: '🍑 时令水果', en: '🍑 Seasonal Fruit' },
    'shop.cat_2': { zh: '🥬 精品蔬菜', en: '🥬 Premium Vegetables' },
    'shop.cat_3': { zh: '🌾 粮油干货', en: '🌾 Grains & Dry Goods' },
    'shop.cat_4': { zh: '🥚 禽蛋肉类', en: '🥚 Eggs & Meat' },
    'shop.result_count': { zh: '共 {total} 件商品', en: '{total} products' },
    'shop.price_unit': { zh: '起', en: 'from' },
    'shop.original': { zh: '原价', en: 'was' },
    'shop.sold': { zh: '已售{sales}', en: '{sales} sold' },
    'shop.nostock': { zh: '暂时缺货', en: 'Out of stock' },
    'shop.instock': { zh: '库存 {stock}', en: '{stock} in stock' },
    'shop.add_cart': { zh: '加入购物车', en: 'Add to Cart' },
    'shop.go_checkout': { zh: '去结算', en: 'Checkout' },
    'shop.cart_empty': { zh: '购物车空空如也', en: 'Your cart is empty' },
    'shop.cart_goshop': { zh: '去逛逛', en: 'Browse Products' },
    'shop.cart_total': { zh: '合计', en: 'Total' },
    'shop.cart_checkout': { zh: '去结算 ({count})', en: 'Checkout ({count})' },
    'shop.cart_clear': { zh: '清空', en: 'Clear' },
    'shop.empty_title': { zh: '没有找到相关商品', en: 'No products found' },
    'shop.empty_desc': { zh: '试试其他关键词或分类吧', en: 'Try a different keyword or category' },
    'shop.loading': { zh: '加载中...', en: 'Loading...' },
    'shop.load_more': { zh: '加载更多', en: 'Load More' },
    'shop.all_loaded': { zh: '— 已显示全部商品 —', en: '— All products shown —' },
    'shop.back_top': { zh: '↑ 回到顶部', en: '↑ Back to Top' },
    'shop.toast_added': { zh: '已加入购物车', en: 'Added to cart' },
    'shop.toast_offline': { zh: '商品已下架', en: 'Product unavailable' },
    'shop.toast_nostock': { zh: '库存不足', en: 'Insufficient stock' },
    'shop.toast_login': { zh: '请先登录', en: 'Please login first' },

    // ---- 个人中心 user-center.html ----
    'user.loading': { zh: '加载中...', en: 'Loading...' },
    'user.default_name': { zh: '用户', en: 'User' },
    'user.tab_orders': { zh: '我的订单', en: 'My Orders' },
    'user.tab_addresses': { zh: '收货地址', en: 'Addresses' },
    'user.tab_profile': { zh: '账户设置', en: 'Account Settings' },
    'user.order_all': { zh: '全部订单', en: 'All Orders' },
    'user.status_pending': { zh: '待支付', en: 'Pending' },
    'user.status_paid': { zh: '已支付', en: 'Paid' },
    'user.status_shipped': { zh: '已发货', en: 'Shipped' },
    'user.status_delivered': { zh: '运输中', en: 'In Transit' },
    'user.status_completed': { zh: '已完成', en: 'Completed' },
    'user.status_cancelled': { zh: '已取消', en: 'Cancelled' },
    'user.status_refunding': { zh: '退款中', en: 'Refunding' },
    'user.status_refunded': { zh: '已退款', en: 'Refunded' },
    'user.order_no': { zh: '订单号', en: 'Order No.' },
    'user.order_items': { zh: '共 {n} 件商品', en: '{n} item(s)' },
    'user.btn_pay': { zh: '去付款', en: 'Pay Now' },
    'user.btn_cancel': { zh: '取消', en: 'Cancel' },
    'user.btn_confirm': { zh: '确认收货', en: 'Confirm Receipt' },
    'user.waiting_ship': { zh: '等待发货', en: 'Awaiting Shipment' },
    'user.completed_label': { zh: '已完成', en: 'Completed' },
    'user.no_orders': { zh: '暂无订单', en: 'No orders yet' },
    'user.go_shop': { zh: '去逛逛 →', en: 'Browse Shop →' },
    'user.load_failed': { zh: '加载失败', en: 'Load failed' },
    'user.confirm_pay': { zh: '确认支付此订单？', en: 'Confirm payment for this order?' },
    'user.pay_success': { zh: '支付成功', en: 'Payment successful' },
    'user.confirm_cancel': { zh: '确定取消此订单？', en: 'Confirm to cancel this order?' },
    'user.cancel_success': { zh: '订单已取消', en: 'Order cancelled' },
    'user.confirm_receive': { zh: '确认已收到商品？', en: 'Confirm receipt of goods?' },
    'user.receive_success': { zh: '已确认收货', en: 'Receipt confirmed' },
    'user.op_failed': { zh: '操作失败', en: 'Operation failed' },
    'user.addr_default': { zh: '默认', en: 'Default' },
    'user.addr_delete': { zh: '删除', en: 'Delete' },
    'user.no_addr': { zh: '暂无收货地址', en: 'No addresses yet' },
    'user.addr_add': { zh: '➕ 新增地址', en: '➕ Add Address' },
    'user.addr_title': { zh: '新增收货地址', en: 'New Address' },
    'user.addr_name': { zh: '收货人', en: 'Receiver' },
    'user.addr_name_ph': { zh: '请输入收货人姓名', en: 'Receiver name' },
    'user.addr_phone': { zh: '手机号', en: 'Phone' },
    'user.addr_phone_ph': { zh: '请输入收货电话', en: 'Receiver phone' },
    'user.addr_detail': { zh: '详细地址', en: 'Detailed Address' },
    'user.addr_detail_ph': { zh: '街道/门牌号', en: 'Street / door number' },
    'user.btn_save': { zh: '保 存', en: 'Save' },
    'user.btn_cancel_form': { zh: '取 消', en: 'Cancel' },
    'user.confirm_del_addr': { zh: '确定删除此地址？', en: 'Confirm to delete this address?' },
    'user.addr_deleted': { zh: '地址已删除', en: 'Address deleted' },
    'user.addr_fill_all': { zh: '请填写完整信息', en: 'Please fill in all fields' },
    'user.addr_saved': { zh: '地址添加成功', en: 'Address added' },
    'user.profile_nickname': { zh: '昵称', en: 'Nickname' },
    'user.profile_save': { zh: '保存修改', en: 'Save Changes' },
    'user.profile_updated': { zh: '资料已更新', en: 'Profile updated' },
    'user.pwd_title': { zh: '修改密码', en: 'Change Password' },
    'user.pwd_old': { zh: '原密码', en: 'Current Password' },
    'user.pwd_old_ph': { zh: '请输入原密码', en: 'Enter current password' },
    'user.pwd_new': { zh: '新密码', en: 'New Password' },
    'user.pwd_new_ph': { zh: '请输入新密码', en: 'Enter new password' },
    'user.pwd_btn': { zh: '修改密码', en: 'Change Password' },
    'user.pwd_required': { zh: '请输入原密码和新密码', en: 'Please enter both passwords' },
    'user.pwd_success': { zh: '密码修改成功', en: 'Password changed' },

    // ---- 结算 checkout.html ----
    'checkout.title': { zh: '📋 确认订单', en: '📋 Confirm Order' },
    'checkout.addr_title': { zh: '📍 收货地址', en: '📍 Shipping Address' },
    'checkout.product_title': { zh: '🛒 商品清单', en: '🛒 Order Items' },
    'checkout.total': { zh: '合计：', en: 'Total: ' },
    'checkout.btn_continue': { zh: '← 继续购物', en: '← Continue Shopping' },
    'checkout.btn_cancel': { zh: '🗑 放弃订单', en: '🗑 Cancel Order' },
    'checkout.btn_save': { zh: '💾 保存订单', en: '💾 Save Order' },
    'checkout.btn_pay': { zh: '💰 去付款', en: '💰 Pay Now' },
    'checkout.btn_processing': { zh: '处理中...', en: 'Processing...' },
    'checkout.no_addr': { zh: '暂无收货地址，请先去', en: 'No address. Please go to' },
    'checkout.personal_center': { zh: '个人中心', en: 'Personal Center' },
    'checkout.add_addr': { zh: '添加地址', en: ' to add an address' },
    'checkout.default': { zh: '默认', en: 'Default' },
    'checkout.qty': { zh: '单价 ¥{price} × {qty}份', en: '¥{price} × {qty}' },
    'checkout.result_success': { zh: '支付成功', en: 'Payment Successful' },
    'checkout.result_order_no': { zh: '订单号：{no}', en: 'Order No.: {no}' },
    'checkout.result_amount': { zh: '金额：¥{amount}', en: 'Amount: ¥{amount}' },
    'checkout.result_shipping': { zh: '我们将尽快为您发货！', en: 'We will ship your order soon!' },
    'checkout.result_ok': { zh: '确 定', en: 'OK' },
    'checkout.cart_invalid': { zh: '购物车商品已失效，请返回', en: 'Cart items expired. Return to' },
    'checkout.shop': { zh: '商城', en: 'Shop' },
    'checkout.select_addr': { zh: '请选择收货地址', en: 'Please select a shipping address' },
    'checkout.product_expired': { zh: '商品已失效', en: 'Product expired' },
    'checkout.pay_fail': { zh: '支付失败，订单已保留', en: 'Payment failed, order saved' },
    'checkout.pay_req_fail': { zh: '支付请求失败，订单已保留', en: 'Payment request failed, order saved' },
    'checkout.cancel_confirm': { zh: '确定放弃此订单？购物车将被清空。', en: 'Confirm to cancel this order? Your cart will be emptied.' },
    'checkout.cancel_result': { zh: '订单已放弃', en: 'Order Cancelled' },
    'checkout.cancel_msg': { zh: '购物车已清空，欢迎再次选购。', en: 'Cart emptied. Welcome back anytime.' },
    'checkout.save_result': { zh: '订单已保存', en: 'Order Saved' },
    'checkout.save_msg': { zh: '订单已创建为"待支付"状态，您可以稍后前往个人中心付款。', en: 'Order created as "Pending Payment". You can pay later in your account.' },
    'checkout.err_create': { zh: '下单失败', en: 'Order creation failed' },
    'checkout.err_network': { zh: '网络错误', en: 'Network error' },

    // ---- 管理后台 admin.html ----
    'admin.header': { zh: '🌾 智慧农业 - 管理后台', en: '🌾 SmartAgri - Admin Panel' },
    'admin.return': { zh: '返回前台', en: 'Frontend' },
    'admin.logout': { zh: '退出登录', en: 'Logout' },
    'admin.dashboard': { zh: '📊 数据概览', en: '📊 Dashboard' },
    'admin.users': { zh: '👥 用户管理', en: '👥 User Management' },
    'admin.products': { zh: '📦 商品管理', en: '📦 Product Management' },
    'admin.categories': { zh: '🏷️ 分类管理', en: '🏷️ Category Management' },
    'admin.orders': { zh: '📋 订单管理', en: '📋 Order Management' },
    'admin.status_pending': { zh: '待支付', en: 'Pending' },
    'admin.status_paid': { zh: '已支付', en: 'Paid' },
    'admin.status_shipped': { zh: '已发货', en: 'Shipped' },
    'admin.status_delivered': { zh: '运输中', en: 'In Transit' },
    'admin.status_completed': { zh: '已完成', en: 'Completed' },
    'admin.status_cancelled': { zh: '已取消', en: 'Cancelled' },
    'admin.stats_users': { zh: '注册用户', en: 'Registered Users' },
    'admin.stats_products': { zh: '商品数量', en: 'Products' },
    'admin.stats_orders': { zh: '订单总数', en: 'Total Orders' },
    'admin.stats_revenue': { zh: '总营收（已付款）', en: 'Revenue (Paid)' },
    'admin.stats_pending': { zh: '待处理订单', en: 'Pending Orders' },
    'admin.search_placeholder': { zh: '搜索账号/昵称', en: 'Search username/nickname' },
    'admin.search_btn': { zh: '搜索', en: 'Search' },
    'admin.role_user': { zh: '普通用户', en: 'User' },
    'admin.role_admin': { zh: '管理员', en: 'Admin' },
    'admin.set_admin': { zh: '设为管理员', en: 'Set Admin' },
    'admin.unset_admin': { zh: '取消管理员', en: 'Remove Admin' },
    'admin.delete': { zh: '删除', en: 'Delete' },
    'admin.confirm_admin': { zh: '确认将该用户设为管理员？', en: 'Confirm to set this user as admin?' },
    'admin.confirm_unadmin': { zh: '确认取消该用户的管理员权限？', en: 'Confirm to remove admin privileges?' },
    'admin.confirm_delete_user': { zh: '确认删除此用户？此操作不可恢复！', en: 'Confirm to delete this user? This cannot be undone!' },
    'admin.toast_admin_set': { zh: '已设为管理员', en: 'Admin set' },
    'admin.toast_admin_unset': { zh: '已取消管理员', en: 'Admin removed' },
    'admin.toast_user_deleted': { zh: '用户已删除', en: 'User deleted' },
    'admin.no_users': { zh: '暂无用户', en: 'No users' },
    'admin.no_products': { zh: '暂无商品', en: 'No products' },
    'admin.no_orders': { zh: '暂无订单', en: 'No orders' },
    'admin.no_categories': { zh: '暂无分类', en: 'No categories' },
    'admin.product_search_ph': { zh: '搜索商品名/描述', en: 'Search product name/desc' },
    'admin.all_cats': { zh: '全部分类', en: 'All Categories' },
    'admin.all_status': { zh: '全部状态', en: 'All Status' },
    'admin.on_sale': { zh: '上架中', en: 'On Sale' },
    'admin.off_sale': { zh: '已下架', en: 'Off Sale' },
    'admin.add_product': { zh: '+ 添加商品', en: '+ Add Product' },
    'admin.edit': { zh: '编辑', en: 'Edit' },
    'admin.toggle_on': { zh: '上架', en: 'List' },
    'admin.toggle_off': { zh: '下架', en: 'Delist' },
    'admin.on': { zh: '上架', en: 'On Sale' },
    'admin.off': { zh: '下架', en: 'Off Sale' },
    'admin.confirm_delete_product': { zh: '确认删除此商品？', en: 'Confirm to delete this product?' },
    'admin.toast_product_deleted': { zh: '商品已删除', en: 'Product deleted' },
    'admin.add_product_title': { zh: '添加商品', en: 'Add Product' },
    'admin.edit_product_title': { zh: '编辑商品', en: 'Edit Product' },
    'admin.confirm_delete_cat': { zh: '确认删除此分类？', en: 'Confirm to delete this category?' },
    'admin.toast_cat_deleted': { zh: '分类已删除', en: 'Category deleted' },
    'admin.add_cat': { zh: '+ 添加分类', en: '+ Add Category' },
    'admin.add_cat_title': { zh: '添加分类', en: 'Add Category' },
    'admin.edit_cat_title': { zh: '编辑分类', en: 'Edit Category' },
    'admin.all_status': { zh: '全部状态', en: 'All Status' },
    'admin.order_search_ph': { zh: '搜索订单号/收货人/电话', en: 'Search order no./receiver/phone' },
    'admin.detail': { zh: '详情', en: 'Detail' },
    'admin.ship': { zh: '发货', en: 'Ship' },
    'admin.complete': { zh: '完成', en: 'Complete' },
    'admin.confirm_ship': { zh: '确认发货', en: 'Confirm Shipment' },
    'admin.confirm_complete': { zh: '确认完成', en: 'Confirm Completion' },
    'admin.confirm_update': { zh: '确定更新状态？', en: 'Confirm to update status?' },
    'admin.toast_status_updated': { zh: '状态已更新', en: 'Status updated' },
    'admin.order_detail_title': { zh: '📋 订单详情 #{id}', en: '📋 Order Detail #{id}' },
    'admin.no_permission': { zh: '无权限访问管理后台', en: 'No permission to access admin panel' },
    'admin.load_failed': { zh: '加载失败', en: 'Load failed' },
    'admin.product_name': { zh: '商品名称 *', en: 'Product Name *' },
    'admin.category': { zh: '分类', en: 'Category' },
    'admin.price': { zh: '售价 *', en: 'Price *' },
    'admin.original_price': { zh: '原价', en: 'Original Price' },
    'admin.stock': { zh: '库存', en: 'Stock' },
    'admin.badge': { zh: '角标', en: 'Badge' },
    'admin.weight': { zh: '规格', en: 'Weight/Spec' },
    'admin.featured': { zh: '推荐', en: 'Featured' },
    'admin.description': { zh: '描述', en: 'Description' },
    'admin.specs': { zh: '规格说明（每行一条）', en: 'Specs (one per line)' },

    // ---- 语言切换器 ----
    'lang.switch': { zh: 'EN', en: '中' },
    'lang.label': { zh: 'English', en: '中文' },
  };

  // ==========================================
  // 公共方法
  // ==========================================
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'zh';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function t(key, params) {
    const lang = getLang();
    let text = (dict[key] && dict[key][lang]) ? dict[key][lang] : key;
    if (params) {
      Object.keys(params).forEach(k => {
        text = text.replace('{' + k + '}', params[k]);
      });
    }
    return text;
  }

  function applyLang(lang) {
    // 1. 更新所有 [data-i18n] 元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] && dict[key][lang]) {
        el.textContent = dict[key][lang];
      }
    });

    // 2. 更新所有 [data-i18n-placeholder] 元素
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] && dict[key][lang]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key][lang];
        }
      }
    });

    // 3. 更新所有 [data-i18n-value] 元素
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      const key = el.getAttribute('data-i18n-value');
      if (dict[key] && dict[key][lang]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = dict[key][lang];
        }
      }
    });

    // 4. 触发自定义事件，让各页面 JS 可以响应语言切换
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  // 页面加载时自动应用
  document.addEventListener('DOMContentLoaded', () => {
    applyLang(getLang());
    // 初始化语言切换按钮事件
    initLangSwitchers();
  });

  // 绑定语言切换按钮的点击事件
  function initLangSwitchers() {
    document.querySelectorAll('.lang-switch').forEach(btn => {
      btn.addEventListener('click', () => {
        const currentLang = getLang();
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        setLang(newLang);
        // 更新所有切换按钮文本
        document.querySelectorAll('.lang-switch').forEach(b => {
          b.textContent = newLang === 'zh' ? 'EN' : '中';
        });
      });
    });
  }

  // 暴露到全局
  window.i18n = { getLang, setLang, t, applyLang, dict };
})();