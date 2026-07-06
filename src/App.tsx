/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import {
  Download,
  Trash2,
  RotateCcw,
  Info,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Heart,
  UserCheck,
  Clock,
  ShieldAlert,
  Briefcase,
  Users,
  Award,
  ShieldCheck,
  Check,
  HelpCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";
import { dimensions, Dimension } from "./data";
import { exportBlankHtml, exportReportHtml } from "./utils/exporter";

// Sample Demo Data representing a realistic, tough career choice
const DEMO_SCORES: Record<string, { a: number; b: number; notes: string }> = {
  // 经济效益
  "eco_income": { a: 8, b: 7, notes: "自己开店上限高，生意好时赚得多；原公司入股分红稳定，但有天花板。" },
  "eco_fairness": { a: 4, b: 8, notes: "开店合伙人经常私占公家便宜，账目不公开；原公司有财务审计，分红按股比很规矩。" },
  "eco_stability": { a: 4, b: 8, notes: "开店受淡旺季影响极大，几个月不赚钱就慌；原公司有成熟客户，常年稳定。" },
  "eco_appreciation": { a: 5, b: 7, notes: "咖啡店转让难，重资产；原公司有上市可能，股权有升值希望。" },
  "eco_hidden_loss": { a: 3, b: 9, notes: "开店老是要给合伙人垫资，很多物料自己买单白干活；原公司零隐形亏损。" },
  // 工作体力
  "work_load": { a: 2, b: 7, notes: "开店自己既是老板又是小工，一人干两人活；原公司有成熟团队，只需要负责核心管理。" },
  "work_emergency": { a: 3, b: 8, notes: "合伙人老是迟到，一堆破烂事要我擦屁股；原公司流程健全，突发事情少。" },
  "work_exhaustion": { a: 2, b: 7, notes: "开店每天熬夜守店，精神极度紧绷，身体吃不消；原公司作息规律，周末能双休。" },
  // 情绪内耗
  "emo_comfort": { a: 3, b: 8, notes: "天天和合伙人因为账目和干活多少生气憋屈；原公司同事关系简单职业，不心累。" },
  "emo_friction": { a: 2, b: 8, notes: "合伙人天天背后算计，防不胜防；原公司各司其职，制度保障，少有扯皮。" },
  "emo_mindset": { a: 3, b: 8, notes: "晚上睡不好，经常为了店里开销发愁焦虑；原公司下班能彻底放松。" },
  "emo_balance": { a: 2, b: 8, notes: "感觉自己干得多、拿得少，被白嫖心理极度不平衡；原公司按劳分配，多劳多得。" },
  // 领导人品
  "part_integrity": { a: 3, b: 9, notes: "搭档喜欢拿店里流水做私事；原公司老板人品端正，业界口碑好，不贪小便宜。" },
  "part_responsibility": { a: 4, b: 8, notes: "搭档一出问题就甩锅给我，不负责；原公司老板非常有担当，敢于承担责任。" },
  "part_vision": { a: 3, b: 8, notes: "搭档为了几百块买菜钱斤斤计较，短视；原公司老板眼光长远，舍得给员工分钱。" },
  "part_security": { a: 2, b: 9, notes: "毫无安全感，害怕他随时退股或卷款；原公司老板合作多年，人品知根知底极具安全感。" },
  // 时间自由
  "free_time": { a: 3, b: 8, notes: "守店守得死死的，请一天假店里就乱套；原公司请假有制度，可调休。" },
  "free_holiday": { a: 2, b: 7, notes: "节假日是餐饮旺季，完全没法休息；原公司可以正常放法定假期。" },
  "free_lax": { a: 2, b: 8, notes: "整个人像拉满的弓，身心俱疲；原公司生活比较松弛稳定。" },
  // 风险
  "risk_dispute": { a: 2, b: 8, notes: "感觉快跟搭档闹掰了，以后散伙分家有打官司风险；原公司有法律顾问，股权协议正规。" },
  "risk_loss": { a: 4, b: 8, notes: "餐饮竞争太惨烈，随时面临倒闭亏损风险；原公司行业门槛高，业务很稳固。" },
  "risk_scapegoat": { a: 3, b: 9, notes: "搭档征信好像有瑕疵，很怕拖累店铺债务；原公司老板无任何不良债务。" },
  // 个人成长
  "gro_ability": { a: 5, b: 8, notes: "开店重复体力劳动多，学不到高级东西；原公司可以做大项目，提升行业眼界和管理经验。" },
  "gro_prospect": { a: 4, b: 7, notes: "单店餐饮前景比较窄；原公司的科技外包行业仍然有稳定增长空间。" },
  "gro_network": { a: 5, b: 8, notes: "接触的都是社区散客，人脉质量一般；在原公司能跟政府、大企业高管打交道，累积高端人脉。" },
  "gro_scalability": { a: 3, b: 7, notes: "单店极难复制，没钱开分店；原公司业务已成熟，正准备向外省复制开拓。" },
  // 信任基础
  "tru_know": { a: 4, b: 8, notes: "现在和搭档完全失去信任，相互提防；和原公司老板知根知底，关系很牢固。" },
  "tru_stability": { a: 3, b: 8, notes: "搭档好几次说不想干了，心不齐；原公司入股协议签5年，有退出机制保障稳定。" },
  // 尊严口碑
  "rep_dignity": { a: 7, b: 8, notes: "开店当老板听着好听，但实际干粗活；入股原公司当合伙人，在行业里地位更体面。" },
  "rep_independent": { a: 6, b: 7, notes: "开店要看合伙人脸色；回公司虽然也要协同老板，但老板性格好，沟通有尊严。" },
  // 综合兜底
  "gua_floor": { a: 2, b: 8, notes: "开店不赚钱就没工资，生活没底；原公司入股有固定基本高管工资，分红是额外的。" },
  "gua_system": { a: 2, b: 8, notes: "全指望我一个人死撑做咖啡和管账，生病了店就瘫痪；原公司团队成熟，缺几天不影响经营。" }
};

const DEMO_WEIGHTS: Record<string, number> = {
  economy: 1.5,
  workload: 1.0,
  emotion: 1.3,
  partner: 1.4,
  freedom: 1.0,
  risk: 1.2,
  growth: 1.1,
  trust: 1.2,
  reputation: 1.0,
  guarantee: 1.1
};

export default function App() {
  // Initialize states from LocalStorage or empty values
  const [scores, setScores] = useState<Record<string, { a: number; b: number; notes: string }>>(() => {
    const saved = localStorage.getItem("career_decision_scores");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Default empty scores for all questions
    const empty: Record<string, { a: number; b: number; notes: string }> = {};
    dimensions.forEach(dim => {
      dim.questions.forEach(q => {
        empty[q.id] = { a: 0, b: 0, notes: "" };
      });
    });
    return empty;
  });

  const [weights, setWeights] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("career_decision_weights");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Default weights from metadata
    const defaultW: Record<string, number> = {};
    dimensions.forEach(dim => {
      defaultW[dim.id] = dim.defaultWeight;
    });
    return defaultW;
  });

  // Track active tooltip details
  const [activeTip, setActiveTip] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("career_decision_scores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem("career_decision_weights", JSON.stringify(weights));
  }, [weights]);

  // Handle score click for a specific option (A or B)
  const handleScoreChange = (qId: string, option: "a" | "b", val: number) => {
    setScores(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        [option]: prev[qId]?.[option] === val ? 0 : val // toggle or set
      }
    }));
  };

  // Handle note text change
  const handleNoteChange = (qId: string, text: string) => {
    setScores(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        notes: text
      }
    }));
  };

  // Handle weight change for a dimension
  const handleWeightChange = (dimId: string, val: number) => {
    setWeights(prev => ({
      ...prev,
      [dimId]: Math.round(val * 10) / 10 // rounded to 1 decimal place
    }));
  };

  // Reset to empty
  const handleReset = () => {
    if (window.confirm("确定要清空当前的评分和备注吗？此操作不可撤销。")) {
      const empty: Record<string, { a: number; b: number; notes: string }> = {};
      dimensions.forEach(dim => {
        dim.questions.forEach(q => {
          empty[q.id] = { a: 0, b: 0, notes: "" };
        });
      });
      setScores(empty);
      const defaultW: Record<string, number> = {};
      dimensions.forEach(dim => {
        defaultW[dim.id] = dim.defaultWeight;
      });
      setWeights(defaultW);
    }
  };

  // Load sample demo data
  const handleLoadDemo = () => {
    if (window.confirm("加载演示数据将覆盖您当前输入的内容，是否确定？")) {
      setScores(DEMO_SCORES);
      setWeights(DEMO_WEIGHTS);
    }
  };

  // Download blank survey
  const handleDownloadBlank = () => {
    try {
      const htmlString = exportBlankHtml();
      const blob = new Blob([htmlString], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "创业与合伙抉择评估问卷_空白打印版.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("导出失败，请重试。");
      console.error(err);
    }
  };

  // Download completed analysis report
  const handleDownloadReport = () => {
    // Check if at least some scores are filled
    const filledCount = Object.keys(scores).filter(key => {
      const s = scores[key];
      return s.a > 0 || s.b > 0;
    }).length;
    if (filledCount === 0) {
      alert("您还未填写任何评分，请填入评分或加载演示数据后再导出报告。");
      return;
    }
    try {
      const htmlString = exportReportHtml(scores, weights);
      const blob = new Blob([htmlString], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "创业与合伙抉择评估分析报告.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("导出分析报告失败，请重试。");
      console.error(err);
    }
  };

  // Calculations
  let totalRawA = 0;
  let totalRawB = 0;
  let totalWeightedA = 0;
  let totalWeightedB = 0;
  let answeredQuestionsCount = 0;

  // Track subscores for each dimension for visualization
  const dimensionStats = dimensions.map(dim => {
    const weight = weights[dim.id] !== undefined ? weights[dim.id] : dim.defaultWeight;
    let dimRawA = 0;
    let dimRawB = 0;
    let count = 0;

    dim.questions.forEach(q => {
      const s = scores[q.id] || { a: 0, b: 0, notes: "" };
      if (s.a > 0 || s.b > 0) {
        dimRawA += s.a;
        dimRawB += s.b;
        count++;
        answeredQuestionsCount++;
      }
      totalRawA += s.a;
      totalRawB += s.b;
      totalWeightedA += s.a * weight;
      totalWeightedB += s.b * weight;
    });

    return {
      id: dim.id,
      name: dim.name,
      shortName: dim.name.replace(/^[一二三四五六七八九十]+、/, ""),
      weight,
      rawA: dimRawA,
      rawB: dimRawB,
      avgA: dim.questions.length > 0 ? dimRawA / dim.questions.length : 0,
      avgB: dim.questions.length > 0 ? dimRawB / dim.questions.length : 0,
      weightedA: dimRawA * weight,
      weightedB: dimRawB * weight,
      maxRaw: dim.questions.length * 10
    };
  });

  const totalPossibleQuestions = dimensions.reduce((acc, curr) => acc + curr.questions.length, 0);

  // Determine winner
  const winner = totalWeightedA > totalWeightedB 
    ? "A" 
    : totalWeightedB > totalWeightedA 
    ? "B" 
    : "EQUAL";

  const diffRaw = Math.abs(totalRawA - totalRawB);
  const diffWeighted = Math.abs(totalWeightedA - totalWeightedB).toFixed(1);

  // Dynamic badge color classes for the general indicator
  const winnerBadgeStyles = winner === "A" 
    ? {
        bg: "bg-emerald-50/60 border-2 border-stone-900 text-emerald-950",
        pill: "bg-emerald-600 text-white border border-stone-900",
        text: "继续和原搭档开店",
        desc: `加权分领先 ${diffWeighted} 分 (原分领先 ${diffRaw} 分)`
      }
    : winner === "B"
    ? {
        bg: "bg-indigo-50/60 border-2 border-stone-900 text-indigo-950",
        pill: "bg-indigo-600 text-white border border-stone-900",
        text: "回原公司入股",
        desc: `加权分领先 ${diffWeighted} 分 (原分领先 ${diffRaw} 分)`
      }
    : {
        bg: "bg-amber-50/60 border-2 border-stone-900 text-amber-950",
        pill: "bg-amber-500 text-white border border-stone-900",
        text: "分值均等 / 尚未评估",
        desc: answeredQuestionsCount > 0 ? "两者目前加权总分极其接近，难分伯仲！" : "请在下方卡片开始为各项指标评分"
      };

  // Helper to retrieve category-specific icon
  const getDimensionIcon = (id: string) => {
    switch (id) {
      case "economy": return <TrendingUp className="w-5 h-5 text-stone-900" />;
      case "workload": return <Clock className="w-5 h-5 text-stone-900" />;
      case "emotion": return <Heart className="w-5 h-5 text-stone-900" />;
      case "partner": return <Users className="w-5 h-5 text-stone-900" />;
      case "freedom": return <Award className="w-5 h-5 text-stone-900" />;
      case "risk": return <ShieldAlert className="w-5 h-5 text-stone-900" />;
      case "growth": return <Briefcase className="w-5 h-5 text-stone-900" />;
      case "trust": return <UserCheck className="w-5 h-5 text-stone-900" />;
      case "reputation": return <Sparkles className="w-5 h-5 text-stone-900" />;
      case "guarantee": return <ShieldCheck className="w-5 h-5 text-stone-900" />;
      default: return <Info className="w-5 h-5 text-stone-900" />;
    }
  };

  return (
    <div className="min-h-screen geometric-grid text-[#1C1917] selection:bg-stone-900 selection:text-white font-sans antialiased pb-20">
      {/* Premium Header */}
      <header className="max-w-7xl mx-auto px-4 pt-10 pb-6 md:px-8">
        <div className="bg-white border-2 border-stone-900 p-6 md:p-8 shadow-geom rounded-none space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-stone-900 bg-stone-100 text-xs font-mono font-bold uppercase tracking-wider text-stone-800 shadow-geom-sm rounded-none">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                职业与合伙重大抉择科学评估系统
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-stone-900 uppercase">
                创业与合伙抉择评估器
              </h1>
              <p className="text-stone-600 max-w-4xl text-sm md:text-base leading-relaxed">
                针对「继续和原搭档开店」与「回原公司入股」两大决策路径设计的量化沙盘。
                通过10大商业与人道维度、32个深度评估项目，辅助您拨开情绪迷雾，看清真实的利益、体力与风险博弈，实现理性不后悔的抉择。
              </p>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleLoadDemo}
                id="btn-load-demo"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-none border-2 border-stone-900 bg-stone-900 hover:bg-stone-800 text-white font-mono font-bold text-xs md:text-sm transition-geom shadow-geom-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-geom cursor-pointer"
                title="加载精选典型商业情景的决策数据，直接体验看板"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                加载演示数据
              </button>
              <button
                onClick={handleReset}
                id="btn-clear-all"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-none border-2 border-stone-900 bg-white hover:bg-stone-50 text-stone-900 font-mono font-bold text-xs md:text-sm transition-geom shadow-geom-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-geom cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                重置清空
              </button>
            </div>
          </div>

          {/* Dynamic score summary & Export widgets */}
          <div className="pt-4 border-t-2 border-stone-900 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            <div className="bg-[#FFFDF9] rounded-none border-2 border-stone-900 p-5 shadow-geom-sm flex items-center justify-between transition-geom hover:shadow-geom hover:translate-x-[-1px] hover:translate-y-[-1px]">
              <div className="space-y-1">
                <span className="text-xs text-stone-500 font-mono font-bold uppercase tracking-wider block">已评估进度</span>
                <span className="text-xl font-extrabold text-stone-900 font-display">
                  {answeredQuestionsCount > totalPossibleQuestions ? totalPossibleQuestions : answeredQuestionsCount} / {totalPossibleQuestions} 项已评分
                </span>
              </div>
              <div className="w-12 h-12 rounded-none bg-stone-100 border-2 border-stone-900 flex items-center justify-center shadow-geom-sm">
                <Check className="w-6 h-6 text-stone-900 stroke-[3]" />
              </div>
            </div>

            <div className="bg-[#FFFDF9] rounded-none border-2 border-stone-900 p-5 shadow-geom-sm flex items-center justify-between transition-geom hover:shadow-geom hover:translate-x-[-1px] hover:translate-y-[-1px]">
              <div className="space-y-1">
                <span className="text-xs text-stone-500 font-mono font-bold uppercase tracking-wider block">导出空白问卷</span>
                <p className="text-xs text-stone-500 leading-tight">获取漂亮的离线评估表，供打印或他人评估</p>
              </div>
              <button
                onClick={handleDownloadBlank}
                id="btn-export-blank"
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-none bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-900 font-mono font-bold text-xs transition-geom shadow-geom-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                导出空白 HTML
              </button>
            </div>

            <div className="bg-[#FFFDF9] rounded-none border-2 border-stone-900 p-5 shadow-geom-sm flex items-center justify-between transition-geom hover:shadow-geom hover:translate-x-[-1px] hover:translate-y-[-1px]">
              <div className="space-y-1">
                <span className="text-xs text-stone-500 font-mono font-bold uppercase tracking-wider block">导出已填评估报告</span>
                <p className="text-xs text-stone-500 leading-tight">生成漂亮的离线分析报告，包含图表与备忘</p>
              </div>
              <button
                onClick={handleDownloadReport}
                id="btn-export-filled"
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-none bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-2 border-indigo-900 font-mono font-bold text-xs transition-geom shadow-geom-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                导出分析 HTML
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: The Interactive Questionnaires */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-8">
          <div className="bg-[#FFFDF9] border-2 border-stone-900 rounded-none p-5 md:p-6 text-stone-700 text-xs md:text-sm space-y-3 shadow-geom-sm">
            <h3 className="font-extrabold text-stone-900 font-display flex items-center gap-2 text-sm md:text-base uppercase tracking-wider">
              <Info className="w-5 h-5 text-stone-950" />
              理性的科学评分指南
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed text-stone-600">
              <li>
                <strong>一律执行“高分即利好，低分即劣势”的评分原则。</strong> 不管是正面还是负面维度，<strong>10分都代表该选项完美、舒心、无压力；1分代表该选项极其糟糕、劳累、高风险。</strong>
              </li>
              <li>
                例如：在 <strong>“风险维度-合伙纠纷风险低”</strong> 细项中，若选项A打10分，说明该选项完全没有散伙纠纷风险（非常安全）；若打1分说明极大概率闹掰打官司（极度危险）。
              </li>
              <li>
                各维度权重代表该项在您心中的<strong>核心分量</strong>（如您极度渴望赚钱，可将经济维度权重调高至 2.0x 以上）。
              </li>
            </ul>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {dimensions.map((dim, dimIdx) => {
              const currentWeight = weights[dim.id] !== undefined ? weights[dim.id] : dim.defaultWeight;
              
              // Calculate local dimension averages
              let localRawA = 0;
              let localRawB = 0;
              let localCount = 0;

              dim.questions.forEach(q => {
                const s = scores[q.id];
                if (s && (s.a > 0 || s.b > 0)) {
                  localRawA += s.a;
                  localRawB += s.b;
                  localCount++;
                }
              });

              const localAvgA = dim.questions.length > 0 ? (localRawA / dim.questions.length).toFixed(1) : "0.0";
              const localAvgB = dim.questions.length > 0 ? (localRawB / dim.questions.length).toFixed(1) : "0.0";

              return (
                <div
                  key={dim.id}
                  className="bg-white rounded-none border-2 border-stone-900 shadow-geom hover:shadow-geom-lg hover:translate-x-[-1px] hover:translate-y-[-1px] transition-geom overflow-hidden"
                >
                  {/* Dimension Header */}
                  <div className="bg-stone-100/70 border-b-2 border-stone-900 p-5 md:p-6 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-white rounded-none border-2 border-stone-900 shadow-geom-sm mt-0.5">
                          {getDimensionIcon(dim.id)}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold font-display tracking-tight text-stone-900">{dim.name}</h2>
                          <p className="text-xs text-stone-500 font-medium mt-1">{dim.desc}</p>
                        </div>
                      </div>

                      {/* Weight Controller */}
                      <div className="bg-white rounded-none border-2 border-stone-900 px-4 py-2.5 shadow-geom-sm flex items-center gap-3 self-start md:self-auto min-w-[240px]">
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-stone-500 font-mono">
                            <span>维度决策权重:</span>
                            <span className="text-stone-900 bg-stone-100 border border-stone-900 px-1.5 py-0.5 font-bold font-mono">
                              {currentWeight.toFixed(1)}x
                            </span>
                          </div>
                          <input
                            type="range"
                             min="0.1"
                            max="3.0"
                            step="0.1"
                            value={currentWeight}
                            onChange={(e) => handleWeightChange(dim.id, parseFloat(e.target.value))}
                            className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Local side-by-side averages indicator */}
                     {localCount > 0 && (
                      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-none border-2 border-stone-900 text-xs font-mono shadow-geom-sm">
                        <span className="font-bold text-stone-900 uppercase">本维度阶段对比：</span>
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 border border-stone-900 bg-emerald-500"></span>
                            A. 继续开店平均: <strong className="text-stone-900 font-bold">{localAvgA}分</strong>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 border border-stone-900 bg-indigo-500"></span>
                            B. 原公司入股平均: <strong className="text-stone-900 font-bold">{localAvgB}分</strong>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dimension Questions */}
                  <div className="p-5 md:p-6 divide-y-2 divide-stone-200">
                    {dim.questions.map((q, qIdx) => {
                      const qScore = scores[q.id] || { a: 0, b: 0, notes: "" };
                      const hasA = qScore.a > 0;
                      const hasB = qScore.b > 0;
                      const isComplete = hasA && hasB;
                      const scoreDiff = qScore.a - qScore.b;

                      return (
                        <div key={q.id} className="py-6 first:pt-0 last:pb-0 space-y-4">
                          {/* Question Label */}
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-sm md:text-base font-bold text-stone-900 flex items-start gap-1.5">
                                <span className="text-stone-400 font-mono text-xs mt-1">{dimIdx + 1}.${qIdx + 1}</span>
                                {q.label}
                              </h3>
                              
                              {/* Quick status indicator */}
                              {isComplete && (
                                <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-none border-2 inline-flex items-center gap-1 shadow-geom-sm ${
                                  scoreDiff > 0 
                                    ? "bg-emerald-100 text-emerald-950 border-stone-900" 
                                    : scoreDiff < 0 
                                    ? "bg-indigo-100 text-indigo-950 border-stone-900" 
                                    : "bg-stone-100 text-stone-950 border-stone-900"
                                }`}>
                                  {scoreDiff > 0 ? `A占优 +${scoreDiff}` : scoreDiff < 0 ? `B占优 +${Math.abs(scoreDiff)}` : "等价平衡"}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-500 leading-relaxed font-normal pl-4 border-l-2 border-stone-300">
                              {q.tip}
                            </p>
                          </div>

                          {/* Interactive Score Selector */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1.5 pl-4">
                            {/* Option A Scoring */}
                            <div className="space-y-3 p-4 rounded-none bg-emerald-50/10 border-2 border-stone-900 shadow-geom-sm">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-extrabold text-emerald-900 flex items-center gap-1.5 font-display">
                                  <span className="w-2 h-2 border border-stone-900 bg-emerald-500"></span>
                                  A. 继续和原搭档开店
                                </span>
                                <span className="text-emerald-800 font-mono font-bold text-[11px]">
                                  {hasA ? `得 ${qScore.a} 分` : "点击数字评分"}
                                </span>
                              </div>
                                                            <div className="flex border-2 border-stone-900 rounded-none overflow-hidden divide-x-2 divide-stone-900">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                                  <button
                                    key={`a-${val}`}
                                    type="button"
                                    onClick={() => handleScoreChange(q.id, "a", val)}
                                    className={`flex-1 h-8 text-[11px] md:text-xs font-mono font-bold transition-geom cursor-pointer ${
                                      qScore.a === val
                                        ? "bg-emerald-600 text-white font-extrabold"
                                        : "bg-white hover:bg-emerald-50 text-stone-700"
                                    }`}
                                  >
                                    {val}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Option B Scoring */}
                            <div className="space-y-3 p-4 rounded-none bg-indigo-50/10 border-2 border-stone-900 shadow-geom-sm">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-extrabold text-indigo-900 flex items-center gap-1.5 font-display">
                                  <span className="w-2 h-2 border border-stone-900 bg-indigo-500"></span>
                                  B. 回原公司入股
                                </span>
                                <span className="text-indigo-800 font-mono font-bold text-[11px]">
                                  {hasB ? `得 ${qScore.b} 分` : "点击数字评分"}
                                </span>
                              </div>
                              <div className="flex border-2 border-stone-900 rounded-none overflow-hidden divide-x-2 divide-stone-900">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                                  <button
                                    key={`b-${val}`}
                                    type="button"
                                    onClick={() => handleScoreChange(q.id, "b", val)}
                                    className={`flex-1 h-8 text-[11px] md:text-xs font-mono font-bold transition-geom cursor-pointer ${
                                      qScore.b === val
                                        ? "bg-indigo-600 text-white font-extrabold"
                                        : "bg-white hover:bg-indigo-50 text-stone-700"
                                    }`}
                                  >
                                    {val}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Notes Text Area */}
                          <div className="pl-4">
                            <input
                              type="text"
                              value={qScore.notes}
                              onChange={(e) => handleNoteChange(q.id, e.target.value)}
                              placeholder="添加事实依据、心路历程备忘 (如：'店里现在平均月赚1.5万' 或 '原公司老板以前对我不薄')..."
                              className="w-full text-xs bg-white text-stone-800 px-3 py-2.5 rounded-none border-2 border-stone-900 focus:outline-hidden transition-geom placeholder:text-stone-400 focus:shadow-geom-sm"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </form>
        </section>

        {/* RIGHT COLUMN: The Sticky Comparison Dashboard */}
        <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 space-y-6">
          
          {/* Decision Recommendation Panel */}
          <div className="bg-white rounded-none border-2 border-stone-900 shadow-geom p-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                最终决策推荐
              </div>
              <div className={`p-4 rounded-none border-2 text-center shadow-geom-sm ${winnerBadgeStyles.bg}`}>
                <span className="text-[10px] md:text-xs font-mono font-bold block opacity-80 uppercase tracking-wide mb-1.5">
                  最契合您底层价值观与实际约束的选项
                </span>
                <span className="text-xl font-extrabold block tracking-tight font-display text-stone-900 uppercase">
                  {winnerBadgeStyles.text}
                </span>
                <span className="text-xs font-bold font-mono block mt-2 opacity-90 border-t border-stone-900/10 pt-1.5">
                  {winnerBadgeStyles.desc}
                </span>
              </div>
            </div>

            {/* Total Weighted Score Comparison */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                加权总得分（核心考量）
              </h4>
              
              {/* Option A Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 border border-stone-900 bg-emerald-500"></span>
                    A. 继续和原搭档开店
                  </span>
                  <span className="font-mono font-bold text-emerald-800">
                    {totalWeightedA.toFixed(1)} 分
                  </span>
                </div>
                <div className="h-4.5 w-full bg-stone-100 rounded-none overflow-hidden border-2 border-stone-900 shadow-geom-sm">
                  <div
                    className="h-full bg-emerald-500 border-r-2 border-stone-900 transition-all duration-500"
                    style={{ width: `${Math.min(100, (totalWeightedA / (totalPossibleQuestions * 10 * 3.0)) * 100 * 5)}%` }}
                  ></div>
                </div>
              </div>

              {/* Option B Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 border border-stone-900 bg-indigo-500"></span>
                    B. 回原公司入股
                  </span>
                  <span className="font-mono font-bold text-indigo-800">
                    {totalWeightedB.toFixed(1)} 分
                  </span>
                </div>
                <div className="h-4.5 w-full bg-stone-100 rounded-none overflow-hidden border-2 border-stone-900 shadow-geom-sm">
                  <div
                    className="h-full bg-indigo-500 border-r-2 border-stone-900 transition-all duration-500"
                    style={{ width: `${Math.min(100, (totalWeightedB / (totalPossibleQuestions * 10 * 3.0)) * 100 * 5)}%` }}
                  ></div>
                </div>
              </div>

              {/* Raw score summary */}
              <div className="pt-3 border-t-2 border-stone-900 flex justify-between text-[11px] text-stone-500 font-mono">
                <span>原始累计总分(未加权):</span>
                <span>
                  A: <strong className="text-stone-900 font-bold font-mono">{totalRawA}分</strong>
                  {"  |  "}
                  B: <strong className="text-stone-900 font-bold font-mono">{totalRawB}分</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Dimension-by-Dimension Side-by-Side Breakdown */}
          <div className="bg-white rounded-none border-2 border-stone-900 shadow-geom p-6 space-y-5">
            <h4 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
              <span>十个决策维度对比雷达</span>
              <span className="text-[10px] font-mono font-normal text-stone-400">(越长代表得分越高)</span>
            </h4>

            <div className="space-y-4">
              {dimensionStats.map(ds => {
                const maxDimVal = ds.maxRaw;
                const percentA = maxDimVal > 0 ? (ds.rawA / maxDimVal) * 100 : 0;
                const percentB = maxDimVal > 0 ? (ds.rawB / maxDimVal) * 100 : 0;

                const isAWinning = ds.rawA > ds.rawB;
                const isBWinning = ds.rawB > ds.rawA;

                return (
                  <div key={ds.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-stone-950 truncate max-w-[140px] font-display" title={ds.name}>
                        {ds.shortName}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-stone-500 bg-stone-100 border border-stone-300 px-1 py-0.5">
                        {ds.weight.toFixed(1)}x
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 h-4 items-center">
                      {/* Left bar (Option A) growing to the left */}
                      <div className="relative h-2.5 bg-stone-100 border border-stone-900 rounded-none overflow-hidden flex justify-end">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isAWinning ? "bg-emerald-500" : "bg-emerald-500/30"
                          }`}
                          style={{ width: `${percentA}%` }}
                        ></div>
                        <span className="absolute left-1.5 top-[-4px] text-[9px] font-mono font-black text-stone-800">
                          {ds.rawA > 0 ? `${ds.rawA}分` : ""}
                        </span>
                      </div>

                      {/* Right bar (Option B) growing to the right */}
                      <div className="relative h-2.5 bg-stone-100 border border-stone-900 rounded-none overflow-hidden flex justify-start">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isBWinning ? "bg-indigo-500" : "bg-indigo-500/30"
                          }`}
                          style={{ width: `${percentB}%` }}
                        ></div>
                        <span className="absolute right-1.5 top-[-4px] text-[9px] font-mono font-black text-stone-800">
                          {ds.rawB > 0 ? `${ds.rawB}分` : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expert Diagnostic Alerts & Psychological Traps */}
          <div className="bg-[#FFFDF9] border-2 border-stone-900 rounded-none p-5 shadow-geom space-y-4">
            <h4 className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              合伙防坑与底层诊断哨所
            </h4>
            
            <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
              <div className="p-3 rounded-none bg-white border-2 border-stone-900 shadow-geom-sm">
                <span className="font-extrabold text-stone-900 font-display block mb-1">⚠️ 合伙人性格与人品否决权：</span>
                如果 <strong>「合伙人/领导人品靠谱度」</strong> 评分低于 <strong>5分</strong>，即使经济利益得分再高，也极其不推荐与之长期合伙。根据商业纠纷统计，90%以上的散伙诉讼都源于早期人品摩擦和不信任。
              </div>

              <div className="p-3 rounded-none bg-white border-2 border-stone-900 shadow-geom-sm">
                <span className="font-extrabold text-stone-900 font-display block mb-1">⚠️ 隐形白嫖与心累风险：</span>
                如果在 <strong>「工作体力」</strong> 或 <strong>「情绪内耗」</strong> 维度得分低于 <strong>4分</strong>，说明您在面临巨大的精神危机和体力超负荷。请慎重考虑是否愿意牺牲未来的健康去博取暂时的金钱。
              </div>

              <div className="p-3 rounded-none bg-white border-2 border-stone-900 shadow-geom-sm">
                <span className="font-extrabold text-stone-900 font-display block mb-1">⚠️ 法律契约重要性：</span>
                一旦确定倾向，请务必就 <strong>退出机制（散伙怎么办）</strong>、<strong>表决权（谁说了算）</strong>、<strong>代持与审计</strong> 签订完善的法律协议，万万不可依赖单纯的哥们义气或口头承诺。
              </div>
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
}
