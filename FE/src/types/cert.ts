export type CertCategory = "license" | "course" | "award" | "hackathon";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;

  issueDate: string;
  startDate?: string;
  endDate?: string;
  expireDate?: string;
  credentialId?: string;

  logo?: string;
  thumb?: string;
  skills?: string[];

  category: CertCategory;
  iconKey?: string;

  previewUrl?: string;
};
