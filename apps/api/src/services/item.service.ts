import prisma from "../config/db";

export const createItem = async (name: string) => {
    return await prisma.item.create({
        data: {name},
    });
};

export const getAllItems = async () => {
    return await prisma.item.findMany();
};

export const updateItem = async (id: string, name : string) => {
    return await prisma.item.update({
        where: {id},
        data: {name},
    });
};

export const deleteItem = async (id: string) => {
    return await prisma.item.delete({
        where: {id},
    })
};