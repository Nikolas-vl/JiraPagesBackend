import prisma from '../../prisma';
import { NotFoundError, ValidationError } from '../../utils/errors';
import { CreateTableInput, UpdateTableInput } from './table.schema';

const tableInclude = {
  location: true,
};

export const getAllTables = (locationId?: number) =>
  prisma.table.findMany({
    where: locationId ? { locationId } : undefined,
    orderBy: [{ locationId: 'asc' }, { number: 'asc' }],
    include: tableInclude,
  });

export const createTable = async (input: CreateTableInput) => {
  const existing = await prisma.table.findUnique({
    where: { number_locationId: { number: input.number, locationId: input.locationId } },
  });
  if (existing) {
    throw new ValidationError(`Table #${input.number} already exists in this location`);
  }

  return prisma.table.create({ data: input, include: tableInclude });
};

export const updateTable = async (id: number, input: UpdateTableInput) => {
  const table = await prisma.table.findUnique({ where: { id } });
  if (!table) throw new NotFoundError('Table not found');

  return prisma.table.update({ where: { id }, data: input, include: tableInclude });
};

export const deleteTable = async (id: number) => {
  const table = await prisma.table.findUnique({ where: { id } });
  if (!table) throw new NotFoundError('Table not found');

  return prisma.table.delete({ where: { id } });
};
