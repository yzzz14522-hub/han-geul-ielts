
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  RotateCcw,
  Search,
  Settings2,
  Volume2
} from "lucide-react";

import { wordsBatch01 } from "./words-batch-01";
import { wordsBatch02 } from "./words-batch-02";
import { wordsBatch03 } from "./words-batch-03";
import { wordsBatch04 } from "./words-batch-04";

type Word = {
  id: number;
  word: string;
  ipa?: string;
  pos: string;
  zh: string;
  hint?: string;
  sentence?: string;
  translation?: string;
  topic: string;
  band: string;
};

type Progress = {
  known: boolean;
  correct: number;
  wrong: number;
  last: number;
};

type Mode = "learn" | "review" | "library";
type Stage = "meaning" | "recall" | "spelling" | "context";

const legacyWords: Word[] = [
  {
    id: 1,
    word: "allocate",
    ipa: "/ˈæləkeɪt/",
    pos: "verb",
    zh: "分配；拨出（资源、时间或金钱）",
    hint: "把有限资源分到不同用途。",
    sentence: "The government should allocate more funding to public transport.",
    translation: "政府应该拨出更多资金用于公共交通。",
    topic: "Government",
    band: "6.5+"
  },
  {
    id: 2,
    word: "contribute",
    ipa: "/kənˈtrɪbjuːt/",
    pos: "verb",
    zh: "贡献；促成；投稿",
    hint: "把一部分力量放进共同成果里。",
    sentence: "Several factors contribute to the rising cost of housing.",
    translation: "多种因素共同导致住房成本上升。",
    topic: "Society",
    band: "6.5+"
  },
  {
    id: 3,
    word: "consequence",
    ipa: "/ˈkɒnsɪkwəns/",
    pos: "noun",
    zh: "结果；后果",
    hint: "一件事发生后跟着出现的结果。",
    sentence: "One consequence of urbanisation is increased pressure on infrastructure.",
    translation: "城市化的一个后果是基础设施承受更大压力。",
    topic: "Society",
    band: "6.5+"
  },
  {
    id: 4,
    word: "significant",
    ipa: "/sɪɡˈnɪfɪkənt/",
    pos: "adjective",
    zh: "显著的；重要的；相当大的",
    hint: "大到值得注意、不能忽略。",
    sentence: "There has been a significant improvement in air quality.",
    translation: "空气质量有了显著改善。",
    topic: "Environment",
    band: "6+"
  },
  {
    id: 5,
    word: "inevitable",
    ipa: "/ɪnˈevɪtəbl/",
    pos: "adjective",
    zh: "不可避免的；必然发生的",
    hint: "条件已经形成，很难阻止它发生。",
    sentence: "Some degree of change is inevitable in a rapidly developing society.",
    translation: "在快速发展的社会中，某种程度的变化不可避免。",
    topic: "Society",
    band: "7+"
  },
  {
    id: 6,
    word: "sustainable",
    ipa: "/səˈsteɪnəbl/",
    pos: "adjective",
    zh: "可持续的；不破坏长期资源的",
    hint: "现在能做，未来也能继续做。",
    sentence: "Cities need to develop more sustainable transport systems.",
    translation: "城市需要发展更可持续的交通系统。",
    topic: "Environment",
    band: "7+"
  },
  {
    id: 7,
    word: "decline",
    ipa: "/dɪˈklaɪn/",
    pos: "verb / noun",
    zh: "下降；衰退；婉拒",
    hint: "数量、程度或状态往下走。",
    sentence: "The number of people using cash has declined steadily.",
    translation: "使用现金的人数持续下降。",
    topic: "Economy",
    band: "6+"
  },
  {
    id: 8,
    word: "substantial",
    ipa: "/səbˈstænʃl/",
    pos: "adjective",
    zh: "大量的；可观的；重大的",
    hint: "份量很大，不是小幅度。",
    sentence: "The project requires substantial investment.",
    translation: "这个项目需要大量投资。",
    topic: "Economy",
    band: "7+"
  },
  {
    id: 9,
    word: "enhance",
    ipa: "/ɪnˈhɑːns/",
    pos: "verb",
    zh: "提高；增强；改善",
    hint: "在原有基础上让品质或能力更好。",
    sentence: "Access to education can enhance employment opportunities.",
    translation: "接受教育能增加就业机会。",
    topic: "Education",
    band: "6.5+"
  },
  {
    id: 10,
    word: "perspective",
    ipa: "/pəˈspektɪv/",
    pos: "noun",
    zh: "观点；角度；看法",
    hint: "你站在哪个位置看一件事。",
    sentence: "It is important to consider the issue from a different perspective.",
    translation: "从不同角度考虑这个问题很重要。",
    topic: "Society",
    band: "7+"
  },
  {
    id: 11,
    word: "prioritise",
    ipa: "/praɪˈɒrətaɪz/",
    pos: "verb",
    zh: "优先处理；把……列为优先",
    hint: "事情很多，先决定哪件最重要。",
    sentence: "Governments should prioritise investment in basic healthcare.",
    translation: "政府应优先投资基础医疗。",
    topic: "Government",
    band: "7+"
  },
  {
    id: 12,
    word: "constraint",
    ipa: "/kənˈstreɪnt/",
    pos: "noun",
    zh: "限制；约束；制约因素",
    hint: "让选择或行动受到限制的条件。",
    sentence: "A lack of funding is a major constraint on the scheme.",
    translation: "资金不足是该计划的一项主要制约因素。",
    topic: "Economy",
    band: "7+"
  },
  {
    id: 13,
    word: "address",
    ipa: "/əˈdres/",
    pos: "verb",
    zh: "处理；应对（问题）",
    hint: "学术语境中常表示着手处理问题，不只是地址。",
    sentence: "More effective policies are needed to address income inequality.",
    translation: "需要更有效的政策来应对收入不平等。",
    topic: "Government",
    band: "6.5+"
  },
  {
    id: 14,
    word: "conventional",
    ipa: "/kənˈvenʃənl/",
    pos: "adjective",
    zh: "传统的；惯常的；常规的",
    hint: "大多数人一直以来习惯采用的方式。",
    sentence: "Conventional teaching methods may not suit every learner.",
    translation: "传统教学方法未必适合每一位学习者。",
    topic: "Education",
    band: "7+"
  },
  {
    id: 15,
    word: "deteriorate",
    ipa: "/dɪˈtɪəriəreɪt/",
    pos: "verb",
    zh: "恶化；变差",
    hint: "原本状况逐渐往坏的方向发展。",
    sentence: "Air quality may deteriorate during periods of heavy traffic.",
    translation: "交通繁忙时段的空气质量可能恶化。",
    topic: "Environment",
    band: "7+"
  }
];

// 合并旧词库和第一批500词。
// 旧词ID仍为1–15，新词ID为16–515。
const words: Word[] = [
  ...legacyWords,
  ...wordsBatch01,
  ...wordsBatch02,
  ...wordsBatch03,
  ...wordsBatch04
];

const stages: { id: Stage; label: string }[] = [
  { id: "meaning", label: "认得单词" },
  { id: "recall", label: "中翻英" },
  { id: "spelling", label: "拼写测试" },
  { id: "context", label: "语境理解" }
];

export default function App() {
  const [progress, setProgress] = useState<Record<number, Progress>>({});
  const [loaded, setLoaded] = useState(false);

  const [mode, setMode] = useState<Mode>("learn");
  const [stage, setStage] = useState<Stage>("meaning");
  const [idx, setIdx] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("全部");
  const [settings, setSettings] = useState(false);

  // 先读取原有进度，避免初始空对象覆盖旧数据。
  useEffect(() => {
    try {
      const saved = localStorage.getItem("han-progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setProgress(parsed);
        }
      }
    } catch {
      console.warn("无法读取本机学习记录。");
    } finally {
      setLoaded(true);
    }
  }, []);

  // 只有读取完成后才写入，继续使用原来的存储键。
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem("han-progress", JSON.stringify(progress));
    } catch {
      console.warn("无法保存本机学习记录。");
    }
  }, [progress, loaded]);

  const due = useMemo(
    () => words.filter((w) => !progress[w.id]?.known),
    [progress]
  );

  const list = mode === "review" ? due : words;
  const w = list[idx % Math.max(1, list.length)] || words[0];

  const known = Object.values(progress).filter((p) => p.known).length;

  const totalCorrect = Object.values(progress).reduce(
    (n, p) => n + p.correct,
    0
  );

  const totalWrong = Object.values(progress).reduce(
    (n, p) => n + p.wrong,
    0
  );

  const topics = [
    "全部",
    ...Array.from(new Set(words.map((w) => w.topic)))
  ];

  const filtered = words.filter(
    (w) =>
      (topic === "全部" || w.topic === topic) &&
      [w.word, w.zh, w.topic, w.pos]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  function speak(text: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.86;

      window.speechSynthesis.speak(utterance);
    }
  }

  function mark(ok: boolean) {
    setProgress((previous) => ({
      ...previous,
      [w.id]: {
        known: ok,
        correct: (previous[w.id]?.correct || 0) + (ok ? 1 : 0),
        wrong: (previous[w.id]?.wrong || 0) + (ok ? 0 : 1),
        last: Date.now()
      }
    }));

    setNotice(
      ok
        ? "已记录为掌握。"
        : "已记录为尚未掌握，会留在待复习清单。"
    );
  }

  function next() {
    setIdx((i) => (i + 1) % Math.max(1, list.length));
    setReveal(false);
    setAnswer("");
    setNotice("");
  }

  function checkSpelling() {
    const correct =
      answer.trim().toLowerCase() === w.word.toLowerCase();

    mark(correct);
    setReveal(true);
  }

  function changeMode(newMode: Mode) {
    setMode(newMode);
    setIdx(0);
    setReveal(false);
    setAnswer("");
    setNotice("");
  }

  function changeStage(newStage: Stage) {
    setStage(newStage);
    setReveal(false);
    setNotice("");
    setAnswer("");
  }

  function previous() {
    setIdx((i) => Math.max(0, i - 1));
    setReveal(false);
    setAnswer("");
    setNotice("");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark">한</div>
          <div>
            <b>한걸음</b>
            <small>IELTS 英语一步</small>
          </div>
        </div>

        <div className="label">LEARNING</div>

        <button
          className={mode === "learn" ? "nav active" : "nav"}
          onClick={() => changeMode("learn")}
        >
          <BookOpen /> 学习训练
        </button>

        <button
          className={mode === "review" ? "nav active" : "nav"}
          onClick={() => changeMode("review")}
        >
          <RotateCcw /> 待复习 <em>{due.length}</em>
        </button>

        <button
          className={mode === "library" ? "nav active" : "nav"}
          onClick={() => changeMode("library")}
        >
          <Layers3 /> 我的词库
        </button>

        <div className="bottom">
          <div className="label">YOUR PROGRESS</div>
          <p>
            已掌握词汇 <b>{known}/{words.length}</b>
          </p>
          <div className="bar">
            <i
              style={{
                width: `${Math.min(100, (known / words.length) * 100)}%`
              }}
            />
          </div>

          <button className="nav" onClick={() => setSettings(!settings)}>
            <Settings2 /> 学习设置
          </button>
        </div>
      </aside>

      <main>
        <header>
          <div>
            <small className="eyebrow">
              YOUR PERSONAL VOCABULARY SPACE
            </small>

            <h1>
              {mode === "learn"
                ? "今天，往前一步。"
                : mode === "review"
                  ? "把学过的，真正留下来。"
                  : "你的个人词库。"}
            </h1>

            <p>
              {mode === "learn"
                ? "不只看懂单词，也要能想起、拼出，并在句子里自然使用。"
                : mode === "review"
                  ? "答错或还不熟悉的单词会再次出现，直到你真正掌握。"
                  : "搜索、筛选并查看目前收录的雅思核心词汇。"}
            </p>
          </div>

          <button
            className="iconbtn"
            onClick={() => setSettings(!settings)}
          >
            <Settings2 />
          </button>
        </header>

        {settings && (
          <div className="notice">
            <b>版本 0.2｜本地学习记录</b>
            <p>
              当前词库共 {words.length} 个单词。学习记录暂存在当前设备的浏览器中。
              跨设备同步、私人账号登录与云端数据库尚未接入。
            </p>
            <p>
              更换浏览器或清除浏览器数据可能导致本机记录丢失，请勿随意清除网站数据。
            </p>
          </div>
        )}

        <div className="stats">
          <div>
            <small>词库总量</small>
            <b>{words.length}</b>
            <span>当前收录词汇</span>
          </div>

          <div>
            <small>已掌握</small>
            <b>{known}</b>
            <span>已标记为掌握</span>
          </div>

          <div>
            <small>待复习</small>
            <b>{due.length}</b>
            <span>尚未掌握</span>
          </div>

          <div>
            <small>累计答对</small>
            <b>{totalCorrect}</b>
            <span>累计答错 {totalWrong} 次</span>
          </div>
        </div>

        {mode === "library" ? (
          <section className="library">
            <div className="tools">
              <div className="search">
                <Search />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIdx(0);
                  }}
                  placeholder="搜索英文、中文或主题…"
                />
              </div>

              <select
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setIdx(0);
                }}
              >
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="card empty">
                <Search />
                <h3>没有找到匹配的单词</h3>
                <p>试试其他英文单词、中文释义或主题名称。</p>
              </div>
            ) : (
              filtered.map((v) => (
                <div className="rowword" key={v.id}>
                  <div>
                    <b>{v.word}</b>
                    <small>
                      {v.ipa ? `${v.ipa} · ` : ""}
                      {v.pos}
                    </small>
                  </div>

                  <p>{v.zh}</p>
                  <span>{v.topic}</span>

                  <button onClick={() => speak(v.word)}>
                    <Volume2 />
                  </button>
                </div>
              ))
            )}

            <small className="count">
              显示 {filtered.length} 个词汇 / 共 {words.length} 个
            </small>
          </section>
        ) : (
          <section className="layout">
            <div>
              <div className="sectiontop">
                <div>
                  <small className="eyebrow">
                    {mode === "review" ? "SPACED REVIEW" : "DAILY PRACTICE"}
                  </small>
                  <h2>{mode === "review" ? "复习训练" : "循序学习"}</h2>
                </div>

                <small>
                  {list.length ? idx + 1 : 0} / {list.length}
                </small>
              </div>

              <div className="stages">
                {stages.map((s, i) => (
                  <button
                    key={s.id}
                    className={stage === s.id ? "stage selected" : "stage"}
                    onClick={() => changeStage(s.id)}
                  >
                    <i>{i + 1}</i>
                    {s.label}
                  </button>
                ))}
              </div>

              {!list.length ? (
                <div className="card empty">
                  <Brain />
                  <h3>目前没有待复习单词</h3>
                  <p>你已完成这一轮。回到学习训练继续扩充词汇。</p>

                  <button
                    className="primary"
                    onClick={() => changeMode("learn")}
                  >
                    开始学习
                  </button>
                </div>
              ) : (
                <div className="card">
                  <div className="cardtop">
                    <span className="pill">{w.topic}</span>
                    <span className="pill muted">IELTS {w.band}</span>

                    <button
                      className="listen"
                      onClick={() => speak(w.word)}
                    >
                      <Volume2 /> 听发音
                    </button>
                  </div>

                  {stage === "meaning" && (
                    <>
                      <h2 className="word">{w.word}</h2>

                      <div className="ipa">
                        {w.ipa || "发音资料待补充"}
                        {" · "}
                        {w.pos}
                      </div>

                      <hr />

                      <p className="prompt">
                        先试着回想它的意思，再揭晓答案。
                      </p>

                      {reveal ? (
                        <div className="answer">
                          <b>{w.zh}</b>

                          {w.hint && <p>{w.hint}</p>}

                          {w.sentence && (
                            <blockquote>
                              {w.sentence}
                              <button onClick={() => speak(w.sentence!)}>
                                <Volume2 />
                              </button>
                            </blockquote>
                          )}

                          {w.translation && <small>{w.translation}</small>}
                        </div>
                      ) : (
                        <button
                          className="reveal"
                          onClick={() => setReveal(true)}
                        >
                          显示中文意思 <ChevronRight />
                        </button>
                      )}
                    </>
                  )}

                  {stage === "recall" && (
                    <>
                      <p className="prompt">
                        看到中文，试着想起英文单词。
                      </p>

                      <h2 className="meaning">{w.zh}</h2>

                      {w.hint && <p className="hint">{w.hint}</p>}

                      {reveal ? (
                        <div className="answer">
                          <b className="answerword">{w.word}</b>
                          <p>
                            {w.ipa ? `${w.ipa} · ` : ""}
                            {w.pos}
                          </p>
                        </div>
                      ) : (
                        <button
                          className="reveal"
                          onClick={() => setReveal(true)}
                        >
                          查看英文答案 <ChevronRight />
                        </button>
                      )}
                    </>
                  )}

                  {stage === "spelling" && (
                    <>
                      <p className="prompt">
                        请根据中文意思，完整拼出这个单词。
                      </p>

                      <h2 className="meaning">{w.zh}</h2>

                      <input
                        className="spell"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && checkSpelling()
                        }
                        placeholder="在这里输入英文拼写"
                      />

                      <button
                        className="primary"
                        disabled={!answer.trim()}
                        onClick={checkSpelling}
                      >
                        检查拼写
                      </button>

                      {reveal && (
                        <div className="answer">
                          <b className="answerword">{w.word}</b>
                          <p>{notice}</p>
                        </div>
                      )}
                    </>
                  )}

                  {stage === "context" && (
                    <>
                      <p className="prompt">
                        通过语境理解这个单词的实际用法。
                      </p>

                      {w.sentence ? (
                        <>
                          <div className="sentence">{w.sentence}</div>

                          {reveal ? (
                            <div className="answer">
                              <b>{w.zh}</b>
                              <p>{w.translation}</p>
                            </div>
                          ) : (
                            <button
                              className="reveal"
                              onClick={() => setReveal(true)}
                            >
                              查看句意与解析 <ChevronRight />
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="answer">
                          <b>{w.word}</b>
                          <p>{w.zh}</p>
                          <small>
                            这一批词条暂未加入例句。你仍可以通过中文释义、
                            拼写和发音进行练习。
                          </small>
                        </div>
                      )}
                    </>
                  )}

                  {notice && stage !== "spelling" && (
                    <p className="notice-text">{notice}</p>
                  )}

                  <div className="actions">
                    <button
                      className="quiet"
                      onClick={() => {
                        setReveal(false);
                        setAnswer("");
                        setNotice("");
                      }}
                    >
                      <RotateCcw /> 重新作答
                    </button>

                    <div>
                      <button
                        className="notyet"
                        onClick={() => {
                          mark(false);
                          next();
                        }}
                      >
                        还不熟
                      </button>

                      <button
                        className="master"
                        onClick={() => {
                          mark(true);
                          next();
                        }}
                      >
                        <Check /> 我会了
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="pager">
                <button onClick={previous}>
                  <ChevronLeft /> 上一个
                </button>

                <button onClick={next}>
                  下一个 <ChevronRight />
                </button>
              </div>
            </div>

            <aside className="tips">
              <div className="tipcard">
                <div className="tipicon">
                  <Brain />
                </div>

                <h3>不是背过，就算会了</h3>
                <p>真正掌握一个单词，至少要做到四件事：</p>

                <ul>
                  <li><Check /> 看到英文能理解</li>
                  <li><Check /> 看到中文能想起英文</li>
                  <li><Check /> 能正确拼写</li>
                  <li><Check /> 能在句子里理解和使用</li>
                </ul>
              </div>

              <div className="tipcard pale">
                <h3>学习提示</h3>
                <p>
                  不确定就选「还不熟」。系统会保留错误记录，
                  让这个词再次进入复习清单。不要用猜对一次代替真正掌握。
                </p>
              </div>

              <div className="tipcard">
                <h3>目前词汇主题</h3>

                <div className="topics">
                  {topics.slice(1).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        )}

        <footer>
          <span>한걸음 · 每天一点，让英文真正成为自己的语言。</span>
          <span>VERSION 0.2.0 · 515 WORDS</span>
        </footer>
      </main>
    </div>
  );
}
