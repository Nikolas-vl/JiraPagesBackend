import { Request, Response } from 'express';
import { createAddress, deleteAddress, getAddressById, getAddresses } from './address.service';


export const createMyAddress = async (req: Request, res: Response): Promise<void> => {
  const address = await createAddress(req.userId!, req.body);
  res.status(201).json(address);
};

export const getMyAddresses = async (req: Request, res: Response) => {
  const addresses = await getAddresses(req.userId!);
  res.json(addresses);
};

export const deleteMyAddress = async (req: Request, res: Response) => {
  const address = await getAddressById(+req.params.id);

  if (!address || address.userId !== req.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await deleteAddress(address.id);
  res.json({ success: true });
};
