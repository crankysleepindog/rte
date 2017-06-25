import { GET } from './utils/ajax';

const __makeGetReq = (oldStore, currentSelectedItem, currentType) => {

	return GET('http://numbersapi.com/' + currentSelectedItem, {
		type: currentType,
	}).then(data => {
		return Promise.resolve().then(() => {
			return Object.assign({}, oldStore, {
				currentType,
				labelToShow: data,
				currentSelectedItem,
			});
		})
	})
}

export function updateIndex(oldStore, options) {
    const {index} = oldStore;
    return Promise.resolve().then(_ => {
        return Object.assign({}, oldStore, {
            index: index + 1,
        });
    });
}
