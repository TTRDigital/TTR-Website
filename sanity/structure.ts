import type { StructureResolver } from "sanity/structure";
import { BookOpen, Building2, CircleHelp, Cog, FileText, Folder, Home, ImageIcon, Layers, Menu, MessageSquareQuote, Settings2, Sparkles, Trophy, User } from "lucide-react";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: React.ComponentType) =>
  S.listItem().title(title).id(type).icon(icon).child(S.document().schemaType(type).documentId(type).title(title));

/** Grouped sidebar: Settings, Home, Services, Industries, Pages, Blog, Proof. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("TTR Digital Marketing")
    .items([
      S.listItem()
        .title("Settings")
        .icon(Settings2)
        .child(S.list().title("Settings").items([singleton(S, "siteSettings", "Site settings", Cog), singleton(S, "navigation", "Navigation", Menu)])),
      singleton(S, "homePage", "Home", Home),
      S.listItem().title("Services").icon(Layers).child(S.documentTypeList("service").title("Services").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.listItem().title("Industries").icon(Building2).child(S.documentTypeList("nichePage").title("Industry pages")),
      S.listItem().title("Pages").icon(FileText).child(S.documentTypeList("page").title("Pages")),
      S.divider(),
      S.listItem()
        .title("Blog")
        .icon(BookOpen)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem().title("Posts").icon(BookOpen).child(S.documentTypeList("post").title("Posts").defaultOrdering([{ field: "publishedAt", direction: "desc" }])),
              S.listItem().title("Categories").icon(Folder).child(S.documentTypeList("category").title("Categories")),
              S.listItem().title("Authors").icon(User).child(S.documentTypeList("author").title("Authors")),
            ]),
        ),
      S.listItem()
        .title("Proof")
        .icon(Sparkles)
        .child(
          S.list()
            .title("Proof")
            .items([
              S.listItem().title("Testimonials").icon(MessageSquareQuote).child(S.documentTypeList("testimonial").title("Testimonials")),
              S.listItem().title("Case studies").icon(Trophy).child(S.documentTypeList("caseStudy").title("Case studies")),
              S.listItem().title("Client logos").icon(ImageIcon).child(S.documentTypeList("clientLogo").title("Client logos")),
              S.listItem().title("FAQs").icon(CircleHelp).child(S.documentTypeList("faq").title("FAQs")),
            ]),
        ),
    ]);
