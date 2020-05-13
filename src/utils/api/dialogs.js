import { axios } from '../../core/index';

export default {
    getAll: () => axios.get("/dialogs")
}