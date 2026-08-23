import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { CopyButton } from "./copy-button";
import { ComponentPreview as ClientComponentPreview } from "./component-preview";
import { InstallationTabs } from "./installation-tabs";
import { HoverEdgeDemo } from "@/components/demos/hover-edge-demo";
import path from "path";
import fs from "fs/promises";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { Steps, Step } from "./steps";
import { extractText } from "@/lib/utils";
import { demos } from "../demos";

interface MarkdownRendererProps {
  content: string;
}


export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="w-full max-w-none pb-24">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight, rehypeSlug],
          },
        }}
        components={{
          HoverEdgeDemo,
          ComponentPreview: async ({ name, preview }) => {
            let rawCode = "";
            try {
              const filePath = path.join(
                process.cwd(),
                "components/demos",
                `${name}.tsx`,
              );
              rawCode = await fs.readFile(filePath, "utf-8");
            } catch (error) {
              rawCode = "// Demo file not found";
            }

            const PreviewComponent = demos[name as keyof typeof demos] || <div>Demo not found</div>;
            const highlightedCode = hljs.highlightAuto(rawCode.trim()).value;

            return (
              <ClientComponentPreview
                preview={PreviewComponent}
                code={
                    <pre className="overflow-x-auto text-[13px] leading-relaxed p-4 w-full h-full">
                     <code 
                        className="hljs bg-transparent!"
                        dangerouslySetInnerHTML={{ __html: highlightedCode }} 
                      />
                    </pre>
                }
              />
            );
          },
          InstallationTabs,
          Steps,
          Step,

          h1: ({ children, ...props }) => (
            <h1
              {...props}
              className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-foreground"
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              {...props}
              className="mt-12 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0"
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              {...props}
              className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground"
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              {...props}
              className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-foreground"
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="leading-7 not-first:mt-6 text-muted-foreground">
              {children}
            </p>
          ),
          a: ({ children, href }) => {
            const isExternal = href?.startsWith("http");
            const className =
              "font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm";

            if (isExternal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {children}
                </a>
              );
            }

            return (
              <Link href={href || "#"} className={className}>
                {children}
              </Link>
            );
          },
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="relative rounded px-[0.3rem] py-[0.1rem] bg-muted/50 font-mono text-sm text-foreground border">
                  {children}
                </code>
              );
            }
            return (
              <code className={`${className} bg-transparent!`}>{children}</code>
            );
          },
          pre: ({ children, ...props }) => {
            const codeElement = React.isValidElement(children)
              ? (children as React.ReactElement<{
                  className?: string;
                  children?: React.ReactNode;
                }>)
              : null;

            const className = codeElement?.props?.className ?? "";
            const language = /language-(\w+)/.exec(className)?.[1] ?? "text";

            const rawText = extractText(codeElement?.props?.children).replace(
              /\n$/,
              "",
            );

            return (
              <div className="my-6 overflow-hidden rounded shadow-sm bg-muted/30">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <span className="text-xs font-mono text-muted-foreground font-medium">
                    {language}
                  </span>

                  <CopyButton text={rawText} />
                </div>
                <pre
                  className="overflow-x-auto text-[13px] leading-relaxed"
                  {...props}
                >
                  {children}
                </pre>
              </div>
            );
          },
          ul: ({ children }) => (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 border-border pl-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-border" />,
          table: ({ children }) => (
            <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
              <table className="w-full text-sm text-left">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted text-foreground border-b border-border">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-medium">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-muted-foreground">{children}</td>
          ),
        }}
      />
    </div>
  );
}
