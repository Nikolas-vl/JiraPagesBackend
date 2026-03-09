import { Request, Response } from 'express';
import * as service from './location.service';
import { CreateLocationInput, UpdateLocationInput } from './location.schema';
import { paramSchema } from '../../utils/common.schema';

export const getAllLocations = async (req: Request, res: Response) => {
  const locations = await service.getAllLocations();
  res.json(locations);
};

export const getLocationById = async (req: Request, res: Response) => {
  const { id } = paramSchema('id').parse(req.params);
  const location = await service.getLocationById(id);
  res.json(location);
};

export const createLocation = async (req: Request, res: Response) => {
  const location = await service.createLocation(req.body as CreateLocationInput);
  res.status(201).json(location);
};

export const updateLocation = async (req: Request, res: Response) => {
  const { id } = paramSchema('id').parse(req.params);
  const location = await service.updateLocation(id, req.body as UpdateLocationInput);
  res.json(location);
};

export const deleteLocation = async (req: Request, res: Response) => {
  const { id } = paramSchema('id').parse(req.params);
  await service.deleteLocation(id);
  res.status(204).end();
};
