import database from '../models/index';
import { Op } from 'sequelize';

export const save = async (newUser) => {
    try {
        return await database.User.create(newUser);
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        return await database.User.findOne({ where: { id, isDeleted: false } });
    } catch (error) {
        throw error;
    }
};

export const getAutoSuggestUsers = async (loginSubstring, limit) => {
    try {
        return await database.User.findAll(
            { where: { isDeleted: false, login: { [Op.iLike]: `%${loginSubstring}%` } }, order: [['login', 'ASC']], limit });
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        return await database.User.findAll({ where: { isDeleted: false } });
    } catch (error) {
        throw error;
    }
};

export const update = async (id, user) => {
    try {
        const userToUpdate = await database.User.findOne({ where: { id } });
        if (userToUpdate) {
            const result = await database.User.update(user, { where: { id } });
            if (result > 0) {
                return user;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) => {
    try {
        let toRemove = await database.User.findOne({ where: { id } });
        if (toRemove) {
            toRemove = { id: toRemove.id, login: toRemove.login, password: toRemove.password, age: toRemove.age, isDeleted: true };
            const result = await database.User.update(toRemove, { where: { id } });
            if (result > 0) {
                return toRemove;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
};
