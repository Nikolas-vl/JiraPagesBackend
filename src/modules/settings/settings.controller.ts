import { Request, Response } from 'express';
import * as service from './settings.service';
import { UpdateSettingsInput } from './settings.schema';

export const getSettings = async (req: Request, res: Response) => {
  const settings = await service.getSettings();
  res.json(settings);
};

export const updateSettings = async (req: Request, res: Response) => {
  const settings = await service.updateSettings(req.body as UpdateSettingsInput);
  res.json(settings);
};
