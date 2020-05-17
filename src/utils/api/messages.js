import { axios } from '../../core/index';

export default {
    getAllByDialogId: id => axios.get("/messages?dialogs=" + id)
}