export const metadata = {
  title: "HTML 邮件模板发送器",
  description: "简单、快速地创建和发送专业的 HTML 邮件，支持模板管理和实时预览",
  openGraph: {
    title: "HTML 邮件模板发送器",
    description:
      "简单、快速地创建和发送专业的 HTML 邮件，支持模板管理和实时预览",
  },
};

export default function HtmlMailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex-1 py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              HTML 邮件模板发送器
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              简单、快速地创建和发送专业的 HTML 邮件，支持模板管理和实时预览
            </p>
            <a
              href="/html-mail/creator"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始使用
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">准备开始？</h2>
          <p className="text-xl text-gray-600 mb-8">
            立即体验专业的 HTML 邮件模板发送服务
          </p>
          <a
            href="/html-mail/creator"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始创建邮件
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 HTML Mail Template. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
