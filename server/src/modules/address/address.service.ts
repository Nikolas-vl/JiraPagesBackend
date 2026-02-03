import prisma from '../../prisma';

export const createAddress = (userId: number, data: any) => {
  return prisma.address.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const getAddresses = (userId: number) => {
  return prisma.address.findMany({
    where: { userId },
  });
};

export const getAddressById = (id: number) => {
  return prisma.address.findUnique({
    where: { id },
  });
};

export const deleteAddress = (id: number) => {
  return prisma.address.delete({
    where: { id },
  });
};

export const updateAddress = (id: number, data: any) => {
  return prisma.address.update({
    where: { id },
    data,
  });
};
