import { Schema, model, models } from 'mongoose';

const faqSchema = new Schema(
  {
    question: String,
    answer: String,
    visibility: Boolean,
  },
  {
    collection: "FAQs",
    timestamps: true,
  }
);

const Faq = models.Faq || model('Faq', faqSchema);
export default Faq;
