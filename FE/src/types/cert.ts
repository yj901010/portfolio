export type CertCategory = "license" | "course";
export type CertTag = "hackathon" | "award";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expireDate?: string;
  credentialId?: string;
  verifyUrl?: string;

  logo?: string;
  thumb?: string;

  skills?: string[];
  category: CertCategory;
  tags?: CertTag[];
  iconKey?: string;
  previewUrl?: string;
};
