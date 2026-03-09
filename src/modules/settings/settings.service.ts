import prisma from '../../prisma';
import { UpdateSettingsInput } from './settings.schema';

export const getSettings = () =>
  prisma.settings.upsert({
    where: { id: 1 },
    create: {},
    update: {},
  });

export const updateSettings = (input: UpdateSettingsInput) =>
  prisma.settings.upsert({
    where: { id: 1 },
    create: { ...input },
    update: { ...input },
  });
