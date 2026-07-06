/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  label: string;
  tip: string;
}

export interface Dimension {
  id: string;
  name: string;
  desc: string;
  defaultWeight: number; // 默认权重
  questions: Question[];
}

export const dimensions: Dimension[] = [
  {
    id: "economy",
    name: "一、经济效益维度",
    desc: "最核心（赚钱能力与资产增值）",
    defaultWeight: 1.5,
    questions: [
      {
        id: "eco_income",
        label: "月度实际到手纯收入",
        tip: "分值越高代表月到手可支配纯利润越丰厚、越能满足财务预期"
      },
      {
        id: "eco_fairness",
        label: "利润分配公平度（不吃亏、不被白嫖）",
        tip: "分值越高代表分红规则公开透明、执行到位，没有一方无偿占便宜"
      },
      {
        id: "eco_stability",
        label: "年收入稳定性（淡旺季波动与抗风险能力）",
        tip: "分值越高代表收入全年平稳，几乎没有淡季亏损或周转断裂风险"
      },
      {
        id: "eco_appreciation",
        label: "长期增值、分红及资产升值空间",
        tip: "分值越高代表未来店铺商誉、股权或固定资产有巨大的升值和转让变现潜力"
      },
      {
        id: "eco_hidden_loss",
        label: "无隐形亏损（不被拖累、不白干活）",
        tip: "分值越高代表没有财务无底洞，不会被迫垫资、替合伙人私账买单或白白出力"
      }
    ]
  },
  {
    id: "workload",
    name: "二、工作量与体力付出维度",
    desc: "辛苦程度与精力消耗",
    defaultWeight: 1.0,
    questions: [
      {
        id: "work_load",
        label: "日常工作负荷（是否一人干两人活）",
        tip: "分值越高代表工作强度适中，分工合理，极少出现一人苦撑全局的情况"
      },
      {
        id: "work_emergency",
        label: "突发事务、善后、擦屁股工作多少",
        tip: "分值越高代表日常运转井然有序，极少需要处理合伙人留下的烂摊子和善后杂事"
      },
      {
        id: "work_exhaustion",
        label: "身体消耗、熬夜、加班、操心程度",
        tip: "分值越高代表生活作息更健康规律，极少被迫熬夜，对身体和精神损害小"
      }
    ]
  },
  {
    id: "emotion",
    name: "三、情绪价值与内耗维度",
    desc: "心情舒适度与心理健康",
    defaultWeight: 1.3,
    questions: [
      {
        id: "emo_comfort",
        label: "工作心情舒适度（不憋屈、不生气）",
        tip: "分值越高代表日常环境愉悦，极少感到憋屈、委屈或无端受气"
      },
      {
        id: "emo_friction",
        label: "人际内耗、扯皮、算计、勾心斗角少",
        tip: "分值越高代表团队合作纯粹坦诚，没有任何拉帮结派或小动作算计"
      },
      {
        id: "emo_mindset",
        label: "每天日常心态：轻松 VS 压抑烦躁",
        tip: "分值越高代表下班后能够彻底放松，没有持续性的焦虑、抑郁或烦躁感"
      },
      {
        id: "emo_balance",
        label: "少有被辜负、被占便宜后的心理不平衡",
        tip: "分值越高代表付出都有相应的回报与尊重，不会产生“我被利用、白白牺牲”的怨气"
      }
    ]
  },
  {
    id: "partner",
    name: "四、合伙人 / 领导人品靠谱度",
    desc: "决定合作能否长久与安全",
    defaultWeight: 1.4,
    questions: [
      {
        id: "part_integrity",
        label: "人品正直、契约精神、不贪小便宜",
        tip: "分值越高代表对方大公无私、遵守约定，绝对不会在账目、公共物资上揩油"
      },
      {
        id: "part_responsibility",
        label: "做事有担当、主动干活、绝不甩锅",
        tip: "分值越高代表对方遇到问题主动顶上，犯错敢于认账，而不是寻找借口推卸责任"
      },
      {
        id: "part_vision",
        label: "格局、长远眼光、不短视算计",
        tip: "分值越高代表对方能共享利益，不为了眼前蝇头小利而破坏长远合作大局"
      },
      {
        id: "part_security",
        label: "相处安全感、不会背后坑人",
        tip: "分值越高代表双方高度透明，绝不会发生中途抢客户、私下挖墙脚、背后拆台等行为"
      }
    ]
  },
  {
    id: "freedom",
    name: "五、时间自由与生活质量",
    desc: "个人生活平衡与人身幸福感",
    defaultWeight: 1.0,
    questions: [
      {
        id: "free_time",
        label: "个人可支配自由时间多寡",
        tip: "分值越高代表请假、调休更自由，容易抽身陪伴家人或处理私事"
      },
      {
        id: "free_holiday",
        label: "节假日能否正常休息、无需守店",
        tip: "分值越高代表周末或法定假日能彻底关机休假，不被绑架在经营现场"
      },
      {
        id: "free_lax",
        label: "生活状态：松弛稳定 VS 紧绷劳累",
        tip: "分值越高代表生活节奏松弛有度，可以有自己的爱好，不至于变成赚钱机器"
      }
    ]
  },
  {
    id: "risk",
    name: "六、风险维度",
    desc: "潜在亏损、官司、纠纷、翻脸概率",
    defaultWeight: 1.2,
    questions: [
      {
        id: "risk_dispute",
        label: "合伙纠纷、吵架、散伙及诉讼风险低",
        tip: "分值越高代表制度或情感基础稳固，散伙、翻脸闹上法庭的概率极低"
      },
      {
        id: "risk_loss",
        label: "经营亏损、客源断层风险低",
        tip: "分值越高代表业务护城河高，不会因为大客户流失或竞对打压瞬间亏本"
      },
      {
        id: "risk_scapegoat",
        label: "免受队友债务拖累或背锅连带风险",
        tip: "分值越高代表合伙人财务独立、守法合规，绝不会让你背负连带债务或官司"
      }
    ]
  },
  {
    id: "growth",
    name: "七、个人成长与未来前景",
    desc: "长期人生赛道与资源积累",
    defaultWeight: 1.1,
    questions: [
      {
        id: "gro_ability",
        label: "个人综合能力与行业技能提升空间",
        tip: "分值越高代表在该平台能学到核心技术、管理、运营或投融资高阶本领"
      },
      {
        id: "gro_prospect",
        label: "行业前景：可持续深耕 5–10 年",
        tip: "分值越高代表行业处于上升期，不易被AI或新模式淘汰，具有长生命周期"
      },
      {
        id: "gro_network",
        label: "社会圈层与核心人脉资源积累",
        tip: "分值越高代表能接触到更优质的客户、供应商、行业领袖，沉淀高价值社会资本"
      },
      {
        id: "gro_scalability",
        label: "未来可复制、可做大连锁的空间",
        tip: "分值越高代表商业模式成熟，容易开分店、招商加盟或在资本市场放大价值"
      }
    ]
  },
  {
    id: "trust",
    name: "八、信任基础与合作稳定性",
    desc: "彼此默契度与怀疑防范成本",
    defaultWeight: 1.2,
    questions: [
      {
        id: "tru_know",
        label: "彼此知根知底、合作无端猜忌",
        tip: "分值越高代表沟通成本极低，不需要在提防对方、防范偷账上耗费心思"
      },
      {
        id: "tru_stability",
        label: "合作长久性、不用担心对方中途撤资或抢跑",
        tip: "分值越高代表合作基石极其牢固，双方都有长期坚守并共渡难关的决心"
      }
    ]
  },
  {
    id: "reputation",
    name: "九、隐形收益：尊严、口碑、圈子",
    desc: "社会认同与底层尊严",
    defaultWeight: 1.0,
    questions: [
      {
        id: "rep_dignity",
        label: "工作体面度、职业自豪感与心态自信",
        tip: "分值越高代表在亲友面前更有面子，职业声誉好，自我认同度高"
      },
      {
        id: "rep_independent",
        label: "不用看人脸色、不需为五斗米忍气吞声",
        tip: "分值越高代表拥有独立决策权与尊严，不需天天迎合、讨好合伙人或老板"
      }
    ]
  },
  {
    id: "guarantee",
    name: "十、综合兜底保障",
    desc: "极端情况下的抗风险能力",
    defaultWeight: 1.1,
    questions: [
      {
        id: "gua_floor",
        label: "收入有底限兜底、不至于大起大落",
        tip: "分值越高代表即便业务受阻，也有固定薪资、基本保障分红，生活品质不崩盘"
      },
      {
        id: "gua_system",
        label: "团队体系成熟，不靠你一个人死撑",
        tip: "分值越高代表流程健全、有替代人手，你生病或请假时业务依然能良性运转"
      }
    ]
  }
];
