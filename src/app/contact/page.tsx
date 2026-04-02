import Link from "next/link";

export default function Contact() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 max-w-2xl mx-auto">
      <Link
        href="/"
        className="text-primary text-sm font-semibold hover:underline"
      >
        &larr; 돌아가기
      </Link>

      <h1 className="font-headline text-3xl font-extrabold mt-8 mb-8">
        Contact
      </h1>

      <div className="space-y-6 text-on-surface-variant text-sm leading-relaxed">
        <p>문의사항이 있으시면 아래로 연락해주세요.</p>

        <div className="bg-surface-container-lowest editorial-shadow rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">mail</span>
            <a
              href="mailto:gibbum93@gmail.com"
              className="text-on-surface font-medium hover:text-primary transition-colors"
            >
              gibbum93@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-primary"
              viewBox="0 0 192 192"
              fill="currentColor"
            >
              <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.248 34.625.45 9.9 5.197 18.413 13.37 23.986 6.913 4.716 15.822 7.06 25.078 6.6 12.197-.607 21.753-5.159 28.396-13.534 5.03-6.34 8.158-14.478 9.464-24.617 5.666 3.42 9.87 7.902 12.21 13.433 3.981 9.396 4.218 24.826-3.312 33.564-6.674 7.739-14.691 11.085-26.73 11.186-22.87.186-35.136-9.456-36.485-28.672l.012.005c-.96-13.637 2.19-24.506 9.361-32.31 5.444-5.928 12.908-9.263 21.476-9.672-.237-.658-.465-1.325-.686-2.003z" />
            </svg>
            <a
              href="https://www.threads.net/@heungall"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface font-medium hover:text-primary transition-colors"
            >
              @heungall
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
