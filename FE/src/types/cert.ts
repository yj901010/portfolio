export type CertCategory = "license" | "course";
export type CertTag = "hackathon" | "award";

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
  tags?: CertTag[];
  iconKey?: string;

  previewUrl?: string;
};
