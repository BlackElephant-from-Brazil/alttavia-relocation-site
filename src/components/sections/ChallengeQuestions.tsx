'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type ChallengeQuestion = {
  q: string
  a: string
}

export function ChallengeQuestions({ items }: { items: readonly ChallengeQuestion[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <ol className="challenge-question-list mx-auto mt-12 max-w-4xl list-none divide-y divide-primary/10 border-y border-primary/10 p-0">
      {items.map(({ q, a }, index) => {
        const open = openIndex === index
        return (
          <li key={q} className="challenge-question-row group md:px-3">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="grid w-full cursor-pointer grid-cols-[2.25rem_1fr_1.5rem] items-start gap-4 py-4 text-left transition-colors hover:bg-white/[0.45] md:grid-cols-[2.75rem_1fr_1.5rem]"
            >
              <span className="challenge-question-number pt-1 font-serif text-base leading-none text-secondary/80 md:text-lg">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-base leading-7 text-ink/90 md:text-lg">{q}</span>
              <ChevronDown
                className={`mt-1.5 h-4 w-4 shrink-0 justify-self-end text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="pb-5 pl-[2.75rem] pr-6 text-sm leading-7 text-graphite md:pl-[3.25rem] md:text-base">
                  {a}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
