import Link from "next/link";

export default function Terms() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 max-w-2xl mx-auto">
      <Link
        href="/"
        className="text-primary text-sm font-semibold hover:underline"
      >
        &larr; 돌아가기
      </Link>

      <h1 className="font-headline text-3xl font-extrabold mt-8 mb-8">
        Terms of Service
      </h1>

      <div className="space-y-6 text-on-surface-variant text-sm leading-relaxed">
        <p>
          본 서비스(Mind Struct)는 사용자가 입력한 텍스트를 AI를 활용하여
          구조화된 형태로 변환해주는 웹 도구입니다.
        </p>

        <h2 className="font-headline text-lg font-bold text-on-surface mt-8">
          1. 서비스 이용
        </h2>
        <p>
          본 서비스는 무료로 제공되며, 별도의 회원가입 없이 이용할 수 있습니다.
          서비스 제공자는 사전 공지 없이 서비스를 변경하거나 중단할 수 있습니다.
        </p>

        <h2 className="font-headline text-lg font-bold text-on-surface mt-8">
          2. 사용자 입력 데이터
        </h2>
        <p>
          사용자가 입력한 텍스트는 AI 구조화 처리 목적으로만 사용되며,
          서버에 별도로 저장되지 않습니다. 입력 데이터는 제3자 AI API(Google
          Gemini)를 통해 처리되며, 해당 API의 이용약관이 추가로 적용됩니다.
        </p>

        <h2 className="font-headline text-lg font-bold text-on-surface mt-8">
          3. 결과물의 활용
        </h2>
        <p>
          AI가 생성한 구조화 결과물은 참고 용도이며, 그 정확성이나 완전성을
          보장하지 않습니다. 결과물의 활용에 따른 책임은 사용자에게 있습니다.
        </p>

        <h2 className="font-headline text-lg font-bold text-on-surface mt-8">
          4. 면책 조항
        </h2>
        <p>
          본 서비스 이용으로 인해 발생하는 직접적, 간접적 손해에 대해
          서비스 제공자는 책임을 지지 않습니다.
        </p>

        <p className="text-xs opacity-50 mt-12">최종 업데이트: 2026년 4월 2일</p>
      </div>
    </main>
  );
}
