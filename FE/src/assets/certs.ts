import type { Certificate } from "../types/cert";
import { img } from "./mockData";

export const CERTS: Certificate[] = [
  {
    id: "c1",
    title: "SQLD (SQL 개발자)",
    issuer: "한국데이터산업진흥원",
    issueDate: "2024-05-10",
    category: "license",
    tags: ["award"], // 예: 배지/수상 성격
    previewUrl: img("photo-1555066931-4365d14bab8c"),
    verifyUrl: "https://example.com/verify/sqld",
  },
  {
    id: "c2",
    title: "Information Processing Engineer (정보처리기사)",
    issuer: "한국산업인력공단",
    issueDate: "2023-11-15",
    category: "license",
    previewUrl: img("photo-1498050108023-c5249f4df085"),
    verifyUrl: "https://example.com/verify/ipe",
  },
  {
    id: "c3",
    title: "Programming with Everyone (Python)",
    issuer: "University of Michigan",
    issueDate: "2024-04-01",
    category: "course",
    tags: ["hackathon"], // 해커톤 관련 학습/참여 맥락
    previewUrl: img("photo-1526378722484-bd91ca387e72"),
    verifyUrl: "https://www.coursera.org/account/accomplishments/certificate/EXAMPLE",
  },
  {
    id: "c4",
    title: "TypeScript: The Complete Developer's Guide",
    issuer: "Udemy",
    issueDate: "2020-12-01",
    category: "course",
    previewUrl: img("photo-1518770660439-4636190af475"),
    verifyUrl: "https://www.udemy.com/certificate/EXAMPLE2",
  },
];
