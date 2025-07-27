// server/src/repositories/finance/invoiceItem.repository.ts
import { InvoiceItemModel } from "../../models";
import { IInvoiceItem } from "../../types";
export class InvoiceItemRepository {
  async createInvoiceItem(data: Partial<IInvoiceItem>): Promise<IInvoiceItem> {
    const item = new InvoiceItemModel(data);
    return await item.save();
  }

  async findInvoiceItemById(id: string): Promise<IInvoiceItem | null> {
    return await InvoiceItemModel.findById(id)
      .populate("student", "firstName lastName")
      .populate("fee", "name amount")
      .exec();
  }

  async findAllInvoiceItems(): Promise<IInvoiceItem[]> {
    return await InvoiceItemModel.find()
      .populate("student", "firstName lastName")
      .populate("fee", "name amount")
      .exec();
  }

  async updateInvoiceItemById(
    id: string,
    updates: Partial<IInvoiceItem>
  ): Promise<IInvoiceItem | null> {
    return await InvoiceItemModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async deleteInvoiceItemById(id: string): Promise<IInvoiceItem | null> {
    return await InvoiceItemModel.findByIdAndDelete(id).exec();
  }

  async deleteAllInvoiceItems(): Promise<void> {
    await InvoiceItemModel.deleteMany({}).exec();
  }
}
