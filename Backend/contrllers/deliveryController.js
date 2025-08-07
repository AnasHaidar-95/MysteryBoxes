import Delivery from "../models/deliveryModel.js";
import { wssClients } from "../server.js";

export const updateDeliveryStatus = async (req, res) => {
  const deliveryId = req.params.id;
  const { status } = req.body;

  try {
    const updated = await Delivery.findByIdAndUpdate(
      deliveryId,
      { status },
      { new: true }
    ).populate("userId");

    if (!updated) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    const userWs = wssClients.get(updated.userId._id.toString());
    if (userWs) {
      userWs.send(JSON.stringify({
        type: "STATUS_UPDATE",
        deliveryId: updated._id,
        newStatus: updated.status,
      }));
    }

    res.json({ message: "Status updated", delivery: updated });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserDeliveries = async (req, res) => {
  const { userId } = req.params;

  try {
    const deliveries = await Delivery.find({ userId }).populate("productsId");
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
