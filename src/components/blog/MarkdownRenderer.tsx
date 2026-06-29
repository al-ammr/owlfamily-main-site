import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ node, children, ...props }) => {
            const text = String(children);
            return (
              <h2 
                id={slugify(text)} 
                className="font-display text-[#F5F0E8] text-[32px] tracking-[0.05em] uppercase mt-12 mb-6 scroll-mt-32"
                {...props}
              >
                {children}
              </h2>
            );
          },
          h3: ({ node, children, ...props }) => {
            const text = String(children);
            return (
              <h3 
                id={slugify(text)} 
                className="font-serif font-semibold text-[#F5F0E8] text-[22px] mt-9 mb-4 scroll-mt-32"
                {...props}
              >
                {children}
              </h3>
            );
          },
          p: ({ node, children, ...props }) => (
            <p className="font-serif text-[#C8C0B0] text-[17px] leading-loose mb-6" {...props}>
              {children}
            </p>
          ),
          blockquote: ({ node, children, ...props }) => (
            <blockquote className="border-l-[3px] border-[#C4622D] bg-[#1A1A1A] py-6 px-8 font-serif italic text-[#E0D8CC] text-[22px] leading-relaxed my-10 shadow-lg" {...props}>
              {children}
            </blockquote>
          ),
          a: ({ node, children, href, ...props }) => (
            <a 
              href={href} 
              className="text-[#C4622D] underline underline-offset-4 hover:text-[#F5F0E8] transition-colors" 
              target="_blank" 
              rel="noopener noreferrer" 
              {...props}
            >
              {children}
            </a>
          ),
          strong: ({ node, children, ...props }) => (
            <strong className="font-serif font-semibold text-[#F5F0E8]" {...props}>
              {children}
            </strong>
          ),
          img: ({ node, src, alt, ...props }) => (
            <span className="block relative w-full h-auto my-12 overflow-hidden rounded-[4px] bg-[#1A1A1A] border border-[#333] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt || ''} className="w-full h-auto object-cover" loading="lazy" />
            </span>
          ),
          ul: ({ node, children, ...props }) => (
            <ul className="list-disc pl-6 mb-6 font-serif text-[#C8C0B0] text-[17px] leading-loose" {...props}>{children}</ul>
          ),
          ol: ({ node, children, ...props }) => (
            <ol className="list-decimal pl-6 mb-6 font-serif text-[#C8C0B0] text-[17px] leading-loose" {...props}>{children}</ol>
          ),
          li: ({ node, children, ...props }) => (
            <li className="mb-2" {...props}>{children}</li>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
