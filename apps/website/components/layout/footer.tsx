"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Facebook, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [language] = useState<"zh" | "en">("zh")

  const footerLinks = {
    community: [
      { name_zh: "關於我們", name_en: "About Us", href: "/about" },
      { name_zh: "加入社群", name_en: "Join Community", href: "https://join.g0v.tw" },
    ],
    resources: [
      { name_zh: "開發指南", name_en: "Developer Guide", href: "/guide" },
      { name_zh: "API 文件", name_en: "API Documentation", href: "/api" },
      { name_zh: "設計資源", name_en: "Design Resources", href: "/design" },
      { name_zh: "媒體資源", name_en: "Media Kit", href: "/media" },
    ],
    legal: [
      { name_zh: "隱私政策", name_en: "Privacy Policy", href: "/privacy" },
      { name_zh: "使用條款", name_en: "Terms of Service", href: "/terms" },
      { name_zh: "授權條款", name_en: "License", href: "/license" },
      { name_zh: "聯絡我們", name_en: "Contact Us", href: "/contact" },
    ],
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C4T</span>
              </div>
              <span className="font-bold text-lg">Code for Taiwan</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {language === "zh"
                ? "用開源協作的力量，打造更透明、參與式的數位民主社會。"
                : "Building a more transparent and participatory digital democracy through open source collaboration."}
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://www.facebook.com/g0v.tw" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="mailto:contact@g0v.tw">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold mb-4">{language === "zh" ? "社群" : "Community"}</h3>
                <ul className="space-y-3">
                  {footerLinks.community.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {language === "zh" ? link.name_zh : link.name_en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">{language === "zh" ? "資源" : "Resources"}</h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {language === "zh" ? link.name_zh : link.name_en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">{language === "zh" ? "法律" : "Legal"}</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {language === "zh" ? link.name_zh : link.name_en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Code for Taiwan. {language === "zh" ? "保留所有權利。" : "All rights reserved."}
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link
                href="https://g0v.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                {language === "zh" ? "零時政府官網" : "g0v Official Site"}
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
