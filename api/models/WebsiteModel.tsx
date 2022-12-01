// Vendors
import { Schema, model, models, Model } from "mongoose";

// Global types
import { IWebsiteSettings } from "@types";

const websiteSchema = new Schema<IWebsiteSettings>(
  {
    // General settings
    companyName: String,
    contactEmail: String,
    websiteTitle: String,
    websiteDescription: String,
    // Appearance
    primaryColor: String,
    secondaryColor: String,
    websiteFavicon: String,
    websiteThumbnail: String,
    websiteLogo: String,
    // Third-party APIs
    coinbaseApi: String,
    crispApi: String,
    googleApi: String,
    // Email deliverability
    mailKey: String,
    mailSender: String,
    // Social media links
    telegram: String,
  },
  { collection: "Websites", timestamps: true }
);

const Website: Model<IWebsiteSettings> =
  models.Website || model("Website", websiteSchema);
export default Website;
