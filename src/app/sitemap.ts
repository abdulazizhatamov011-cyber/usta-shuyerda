import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublicMasters } from "@/server/masters";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "",
    "/xizmatlar",
    "/qanday-ishlaydi",
    "/ustalar",
    "/ustalar-uchun",
    "/yol-xaritasi",
    "/savollar",
    "/buyurtma",
    "/usta-bolish",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
  const profiles = (await getPublicMasters()).map((master) => ({
    url: `${site.url}/ustalar/${master.id}`,
    lastModified: new Date(),
  }));
  return [...pages, ...profiles];
}
