"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./motion";

/*
 * 位置関係は公式案内図に準拠（表現は簡素に）。
 * ・名張川は町の南を東西に流れる
 * ・白梅軒予定地はミュージアムの真正面、やなせ宿はその一軒置いて西側
 * ・東へ向かうと清風亭、宇流冨志禰神社。街道の先に名張駅
 */
type Anchor = "start" | "middle" | "end";
type Spot = {
  x: number;
  y: number;
  label: string;
  note: string;
  color: string;
  chapter?: boolean;
  labelX: number;
  labelY: number;
  anchor: Anchor;
  noteX: number;
  noteY: number;
};

const SPOTS: Spot[] = [
  {
    x: 150, y: 210, label: "生誕地ミュージアム", note: "第一章", color: "var(--copper)", chapter: true,
    labelX: 150, labelY: 190, anchor: "middle", noteX: 150, noteY: 176,
  },
  {
    x: 152, y: 228, label: "白梅軒（予定地）", note: "第二章", color: "var(--aka)", chapter: true,
    labelX: 152, labelY: 248, anchor: "middle", noteX: 152, noteY: 261,
  },
  {
    x: 118, y: 232, label: "旧細川邸", note: "やなせ宿", color: "var(--kinari)",
    labelX: 106, labelY: 226, anchor: "end", noteX: 106, noteY: 239,
  },
  {
    x: 228, y: 212, label: "清風亭", note: "うなぎの老舗", color: "var(--kinari)",
    labelX: 240, labelY: 216, anchor: "start", noteX: 240, noteY: 229,
  },
  {
    x: 310, y: 192, label: "宇流冨志禰神社", note: "祭りの太鼓", color: "var(--kinari)",
    labelX: 310, labelY: 172, anchor: "middle", noteX: 310, noteY: 158,
  },
];

/** 名張旧町、物語の地図。一点ずつ、灯りが増えていく。 */
export default function TownMap() {
  return (
    <section className="bg-sumi py-40" aria-label="町の地図">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="text-center text-sm tracking-[0.4em] text-kinari/60">
            物語の舞台は、歩いてまわれる広さです。
          </p>
        </FadeIn>
        <FadeIn delay={0.2} className="mt-16">
          <svg
            viewBox="0 0 400 340"
            className="mx-auto w-full max-w-2xl"
            role="img"
            aria-label="名張旧町の地図。名張川が町の南を流れ、生誕地ミュージアムの真正面に白梅軒予定地、その一軒西にやなせ宿。東に清風亭と宇流冨志禰神社が並び、街道の先に名張駅がある"
          >
            {/* 名張川 — 町の南を東西に */}
            <motion.path
              d="M 15 280 C 100 276, 250 278, 392 272"
              fill="none"
              stroke="var(--fukamidori)"
              strokeWidth="14"
              strokeOpacity="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 2.6, ease: "easeInOut" }}
            />
            <text x="50" y="285" fill="var(--kinari)" fillOpacity="0.5" fontSize="11" letterSpacing="3">
              名張川
            </text>

            {/* 旧初瀬街道 — 町の背骨。スポットはこの道沿いに並ぶ */}
            <motion.path
              d="M 44 224 C 110 218, 200 212, 260 206 S 350 197, 396 194"
              fill="none"
              stroke="var(--kinari)"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}
            />

            {/* 路地・橋 */}
            {[
              "M 90 40 L 148 206",
              "M 110 150 L 350 134",
              "M 118 236 L 114 322",
              "M 165 224 L 162 322",
              "M 250 212 L 246 322",
              "M 312 196 L 308 322",
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="var(--kinari)"
                strokeWidth="0.7"
                strokeOpacity="0.25"
                strokeDasharray="3 5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 2, delay: 0.7 + i * 0.15, ease: "easeInOut" }}
              />
            ))}

            {/* 名張駅への方角 */}
            <text
              x="396"
              y="186"
              textAnchor="end"
              fill="var(--kinari)"
              fillOpacity="0.35"
              fontSize="9"
              letterSpacing="2"
            >
              名張駅へ→
            </text>

            {/* 場所 */}
            {SPOTS.map((s, i) => (
              <motion.g
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.2, delay: 1.2 + i * 0.4 }}
              >
                <circle cx={s.x} cy={s.y} r={s.chapter ? 4.5 : 3.5} fill={s.color} />
                {s.chapter && (
                  <circle cx={s.x} cy={s.y} r="4.5" fill="none" stroke={s.color} className="ripple" />
                )}
                <text
                  x={s.labelX}
                  y={s.labelY}
                  textAnchor={s.anchor}
                  fill="var(--kinari)"
                  fillOpacity="0.88"
                  fontSize="11"
                  letterSpacing="2"
                >
                  {s.label}
                </text>
                <text
                  x={s.noteX}
                  y={s.noteY}
                  textAnchor={s.anchor}
                  fill="var(--copper)"
                  fillOpacity="0.9"
                  fontSize="8.5"
                  letterSpacing="2"
                >
                  {s.note}
                </text>
              </motion.g>
            ))}
          </svg>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mt-10 text-center text-sm leading-loose text-kinari/60">
            一点ずつ、灯りを増やしていきます。<br />
            点が線になり、線が町になるまで。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
