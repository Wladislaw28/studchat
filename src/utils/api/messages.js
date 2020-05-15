import { axios } from '../../core/index';

export default {
    getAllByDialogId: () => axios.get("/messages")
}