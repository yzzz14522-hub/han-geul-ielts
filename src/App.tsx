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

type Word = {
  id: number;
  word: string;
  ipa: string;
  pos: string;
  zh: string;
  hint: string;
  sentence: string;
  translation: string;
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

const words: Word[] = [
  {
    id: 1,
    word: "allocate",
    ipa: "/ˈæləkeɪt/",
    pos: "verb",
    zh: "分配；撥出（資源、時間或金錢）",
    hint: "把有限資源分到不同用途。",
    sentence: "The government should allocate more funding to public transport.",
    translation: "政府應該撥出更多資金用於公共交通。",
    topic: "Government",
    band: "6.5+"
  },
  {
    id: 2,
    word: "contribute",
    ipa: "/kənˈtrɪbjuːt/",
    pos: "verb",
    zh: "貢獻；促成；投稿",
    hint: "把一部分力量放進共同成果裡。",
    sentence: "Several factors contribute to the rising cost of housing.",
    translation: "多種因素共同導致住房成本上升。",
    topic: "Society",
    band: "6.5+"
  },
  {
    id: 3,
    word: "consequence",
    ipa: "/ˈkɒnsɪkwəns/",
    pos: "noun",
    zh: "結果；後果",
    hint: "一件事發生後跟著出現的結果。",
    sentence: "One consequence of urbanisation is increased pressure on infrastructure.",
    translation: "城市化的一個後果是基礎設施承受更大壓力。",
    topic: "Society",
    band: "6.5+"
  },
  {
    id: 4,
    word: "significant",
    ipa: "/sɪɡˈnɪfɪkənt/",
    pos: "adjective",
    zh: "顯著的；重要的；相當大的",
    hint: "大到值得注意、不能忽略。",
    sentence: "There has been a significant improvement in air quality.",
    translation: "空氣品質有了顯著改善。",
    topic: "Environment",
    band: "6+"
  },
  {
    id: 5,
    word: "inevitable",
    ipa: "/ɪnˈevɪtəbl/",
    pos: "adjective",
    zh: "不可避免的；必然發生的",
    hint: "條件已經形成，很難阻止它發生。",
    sentence: "Some degree of change is inevitable in a rapidly developing society.",
    translation: "在快速發展的社會中，某種程度的變化不可避免。",
    topic: "Society",
    band: "7+"
  },
  {
    id: 6,
    word: "sustainable",
    ipa: "/səˈsteɪnəbl/",
    pos: "adjective",
    zh: "可持續的；不破壞長期資源的",
    hint: "現在能做，未來也能繼續做。",
    sentence: "Cities need to develop more sustainable transport systems.",
    translation: "城市需要發展更可持續的交通系統。",
    topic: "Environment",
    band: "7+"
  },
  {
    id: 7,
    word: "decline",
    ipa: "/dɪˈklaɪn/",
    pos: "verb / noun",
    zh: "下降；衰退；婉拒",
    hint: "數量、程度或狀態往下走。",
    sentence: "The number of people using cash has declined steadily.",
    translation: "使用現金的人數持續下降。",
    topic: "Economy",
    band: "6+"
  },
  {
    id: 8,
    word: "substantial",
    ipa: "/səbˈstænʃl/",
    pos: "adjective",
    zh: "大量的；可觀的；重大的",
    hint: "份量很大，不是小幅度。",
    sentence: "The project requires substantial investment.",
    translation: "這個項目需要大量投資。",
    topic: "Economy",
    band: "7+"
  },
  {
    id: 9,
    word: "enhance",
    ipa: "/ɪnˈhɑːns/",
    pos: "verb",
    zh: "提高；增強；改善",
    hint: "在原有基礎上讓品質或能力更好。",
    sentence: "Access to education can enhance employment opportunities.",
    translation: "接受教育能增加就業機會。",
    topic: "Education",
    band: "6.5+"
  },
  {
    id: 10,
    word: "perspective",
    ipa: "/pəˈspektɪv/",
    pos: "noun",
    zh: "觀點；角度；看法",
    hint: "你站在哪個位置看一件事。",
    sentence: "It is important to consider the issue from a different perspective.",
    translation: "從不同角度考慮這個問題很重要。",
    topic: "Society",
    band: "7+"
  },
  {
    id: 11,
    word: "prioritise",
    ipa: "/praɪˈɒrətaɪz/",
    pos: "verb",
    zh: "優先處理；把……列為優先",
    hint: "事情很多，先決定哪件最重要。",
    sentence: "Governments should prioritise investment in basic healthcare.",
    translation: "政府應優先投資基礎醫療。",
    topic: "Government",
    band: "7+"
  },
  {
    id: 12,
    word: "constraint",
    ipa: "/kənˈstreɪnt/",
    pos: "noun",
    zh: "限制；約束；制約因素",
    hint: "讓選擇或行動受到限制的條件。",
    sentence: "A lack of funding is a major constraint on the scheme.",
    translation: "資金不足是該計劃的一項主要制約因素。",
    topic: "Economy",
    band: "7+"
  },
  {
    id: 13,
    word: "address",
    ipa: "/əˈdres/",
    pos: "verb",
    zh: "處理；應對（問題）",
    hint: "學術語境中常表示著手處理問題，不只是地址。",
    sentence: "More effective policies are needed to address income inequality.",
    translation: "需要更有效的政策來應對收入不平等。",
    topic: "Government",
    band: "6.5+"
  },
  {
    id: 14,
    word: "conventional",
    ipa: "/kənˈvenʃənl/",
    pos: "adjective",
    zh: "傳統的；慣常的；常規的",
    hint: "大多數人一直以來習慣採用的方式。",
    sentence: "Conventional teaching methods may not suit every learner.",
    translation: "傳統教學方法未必適合每一位學習者。",
    topic: "Education",
    band: "7+"
  },
  {
    id: 15,
    word: "deteriorate",
    ipa: "/dɪˈtɪəriəreɪt/",
    pos: "verb",
    zh: "惡化；變差",
    hint: "原本狀況逐漸往壞的方向發展。",
    sentence: "Air quality may deteriorate during periods of heavy traffic.",
    translation: "交通繁忙時段的空氣品質可能惡化。",
    topic: "Environment",
    band: "7+"
  }
];

const stages: { id: Stage; label: string }[] = [
  { id: "meaning", label: "認得單字" },
  { id: "recall", label: "中翻英" },
  { id: "spelling", label: "拼寫測試" },
  { id: "context", label: "語境理解" }
];

export default function App() {
  const [progress, setProgress] = useState<Record<number, Progress>>({});
  const [mode, setMode] = useState<Mode>("learn");
  const [stage, setStage] = useState<Stage>("meaning");
  const [idx, setIdx] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("全部");
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("han-progress");
      if (saved) setProgress(JSON.parse(saved));
    } catch {
      console.warn("無法讀取本機學習紀錄。");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("han-progress", JSON.stringify(progress));
  }, [progress]);

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

  const topics = ["全部", ...Array.from(new Set(words.map((w) => w.topic)))];

  const filtered = words.filter(
    (w) =>
      (topic === "全部" || w.topic === topic) &&
      [w.word, w.zh, w.topic]
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
        ? "已記錄為掌握。"
        : "已記錄為尚未掌握，會留在待複習清單。"
    );
  }

  function next() {
    setIdx((i) => (i + 1) % Math.max(1, list.length));
    setReveal(false);
    setAnswer("");
    setNotice("");
  }

  function checkSpelling() {
    const correct = answer.trim().toLowerCase() === w.word.toLowerCase();
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

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark">한</div>
          <div>
            <b>한걸음</b>
            <small>IELTS 英語一步</small>
          </div>
        </div>

        <div className="label">LEARNING</div>

        <button
          className={mode === "learn" ? "nav active" : "nav"}
          onClick={() => changeMode("learn")}
        >
          <BookOpen /> 學習訓練
        </button>

        <button
          className={mode === "review" ? "nav active" : "nav"}
          onClick={() => changeMode("review")}
        >
          <RotateCcw /> 待複習 <em>{due.length}</em>
        </button>

        <button
          className={mode === "library" ? "nav active" : "nav"}
          onClick={() => changeMode("library")}
        >
          <Layers3 /> 我的詞庫
        </button>

        <div className="bottom">
          <div className="label">YOUR PROGRESS</div>
          <p>
            已掌握詞彙 <b>{known}/{words.length}</b>
          </p>
          <div className="bar">
            <i style={{ width: `${(known / words.length) * 100}%` }} />
          </div>
          <button className="nav" onClick={() => setSettings(!settings)}>
            <Settings2 /> 學習設定
          </button>
        </div>
      </aside>

      <main>
        <header>
          <div>
            <small className="eyebrow">YOUR PERSONAL VOCABULARY SPACE</small>
            <h1>
              {mode === "learn"
                ? "今天，往前一步。"
                : mode === "review"
                  ? "把學過的，真正留下來。"
                  : "你的個人詞庫。"}
            </h1>
            <p>
              {mode === "learn"
                ? "不只看懂單字，也要能想起、拼出，並在句子裡自然使用。"
                : mode === "review"
                  ? "答錯或還不熟悉的單字會再次出現，直到你真正掌握。"
                  : "搜尋、篩選並查看目前收錄的雅思核心詞彙。"}
            </p>
          </div>
          <button className="iconbtn" onClick={() => setSettings(!settings)}>
            <Settings2 />
          </button>
        </header>

        {settings && (
          <div className="notice">
            <b>版本 0.1｜目前進度儲存方式</b>
            <p>
              學習紀錄暫存在目前裝置的瀏覽器。跨裝置同步、私人帳號登入與雲端資料庫尚未接入。
            </p>
          </div>
        )}

        <div className="stats">
          <div>
            <small>詞庫總量</small>
            <b>{words.length}</b>
            <span>核心示範詞彙</span>
          </div>
          <div>
            <small>已掌握</small>
            <b>{known}</b>
            <span>已標記為掌握</span>
          </div>
          <div>
            <small>待複習</small>
            <b>{due.length}</b>
            <span>尚未掌握</span>
          </div>
          <div>
            <small>累積答對</small>
            <b>{totalCorrect}</b>
            <span>練習紀錄</span>
          </div>
        </div>

        {mode === "library" ? (
          <section className="library">
            <div className="tools">
              <div className="search">
                <Search />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜尋英文、中文或主題…"
                />
              </div>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {filtered.map((v) => (
              <div className="rowword" key={v.id}>
                <div>
                  <b>{v.word}</b>
                  <small>{v.ipa} · {v.pos}</small>
                </div>
                <p>{v.zh}</p>
                <span>{v.topic}</span>
                <button onClick={() => speak(v.word)}>
                  <Volume2 />
                </button>
              </div>
            ))}

            <small className="count">顯示 {filtered.length} 個詞彙</small>
          </section>
        ) : (
          <section className="layout">
            <div>
              <div className="sectiontop">
                <div>
                  <small className="eyebrow">
                    {mode === "review" ? "SPACED REVIEW" : "DAILY PRACTICE"}
                  </small>
                  <h2>{mode === "review" ? "複習訓練" : "循序學習"}</h2>
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
                  <h3>目前沒有待複習單字</h3>
                  <p>你已完成這一輪。回到學習訓練繼續擴充詞彙。</p>
                  <button
                    className="primary"
                    onClick={() => changeMode("learn")}
                  >
                    開始學習
                  </button>
                </div>
              ) : (
                <div className="card">
                  <div className="cardtop">
                    <span className="pill">{w.topic}</span>
                    <span className="pill muted">IELTS {w.band}</span>
                    <button className="listen" onClick={() => speak(w.word)}>
                      <Volume2 /> 聽發音
                    </button>
                  </div>

                  {stage === "meaning" && (
                    <>
                      <h2 className="word">{w.word}</h2>
                      <div className="ipa">{w.ipa} · {w.pos}</div>
                      <hr />
                      <p className="prompt">
                        先試著回想它的意思，再揭曉答案。
                      </p>
                      {reveal ? (
                        <div className="answer">
                          <b>{w.zh}</b>
                          <p>{w.hint}</p>
                          <blockquote>
                            {w.sentence}
                            <button onClick={() => speak(w.sentence)}>
                              <Volume2 />
                            </button>
                          </blockquote>
                          <small>{w.translation}</small>
                        </div>
                      ) : (
                        <button
                          className="reveal"
                          onClick={() => setReveal(true)}
                        >
                          顯示中文意思 <ChevronRight />
                        </button>
                      )}
                    </>
                  )}

                  {stage === "recall" && (
                    <>
                      <p className="prompt">
                        看到中文，試著想起英文單字。
                      </p>
                      <h2 className="meaning">{w.zh}</h2>
                      <p className="hint">{w.hint}</p>
                      {reveal ? (
                        <div className="answer">
                          <b className="answerword">{w.word}</b>
                          <p>{w.ipa} · {w.pos}</p>
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
                        請根據中文意思，完整拼出這個單字。
                      </p>
                      <h2 className="meaning">{w.zh}</h2>
                      <input
                        className="spell"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && checkSpelling()
                        }
                        placeholder="在這裡輸入英文拼寫"
                      />
                      <button
                        className="primary"
                        disabled={!answer.trim()}
                        onClick={checkSpelling}
                      >
                        檢查拼寫
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
                        讀句子，理解這個單字在真實語境中的用法。
                      </p>
                      <div className="sentence">{w.sentence}</div>
                      <p className="hint">
                        試著說明整句意思，以及這個詞在句中扮演的角色。
                      </p>
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
                          查看句意與解析 <ChevronRight />
                        </button>
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
                        還不熟
                      </button>
                      <button
                        className="master"
                        onClick={() => {
                          mark(true);
                          next();
                        }}
                      >
                        <Check /> 我會了
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="pager">
                <button
                  onClick={() => {
                    setIdx((i) => Math.max(0, i - 1));
                    setReveal(false);
                    setNotice("");
                  }}
                >
                  <ChevronLeft /> 上一個
                </button>
                <button onClick={next}>
                  下一個 <ChevronRight />
                </button>
              </div>
            </div>

            <aside className="tips">
              <div className="tipcard">
                <div className="tipicon">
                  <Brain />
                </div>
                <h3>不是背過，就算會了</h3>
                <p>真正掌握一個單字，至少要做到四件事：</p>
                <ul>
                  <li><Check /> 看到英文能理解</li>
                  <li><Check /> 看到中文能想起英文</li>
                  <li><Check /> 能正確拼寫</li>
                  <li><Check /> 能在句子裡理解和使用</li>
                </ul>
              </div>

              <div className="tipcard pale">
                <h3>學習提示</h3>
                <p>
                  不確定就選「還不熟」。系統會保留錯誤紀錄，讓這個詞再次進入複習清單。不要用猜對一次代替真正掌握。
                </p>
              </div>

              <div className="tipcard">
                <h3>目前詞彙主題</h3>
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
          <span>한걸음 · 每天一點，讓英文真正成為自己的語言。</span>
          <span>VERSION 0.1.0 · MVP</span>
        </footer>
      </main>
    </div>
  );
}
