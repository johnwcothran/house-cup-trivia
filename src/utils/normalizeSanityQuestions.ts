import data from '../data/book3';

const prefixes = [
    "A.",
    "B.",
    "C.",
    "D.",
    "E.",
    "F."
];
export const categories = [
    { id: 'defense', name: 'Defense Against The Dark Arts' },
    { id: 'charms', name: 'Charms' },
    { id: 'history', name: 'History of Magic' },
    { id: 'care', name: 'Care of Magical Creatures' },
    { id: 'muggle', name: 'Muggle Studies' },
    { id: 'potions', name: 'Potions' },
    { id: 'transfiguration', name: 'Transfiguration' },
    { id: 'herbology', name: 'Herbology' },
    { id: 'divination', name: 'Divination'}
 ];

 export const parseData = (d) => d.map(d => {
    const id = d._id;
    const question = d.questionText.map(qt => qt.children.map(child => child.text)).join('');
    const _options = d.options.map((option, idx) => ({
        ...option,
        text: `${prefixes[idx]} ${option.title}`
    }))
    const answer = _options.find(option => option.correct)?.text;
    const category = categories.find(category => category.name === d.category?.title)?.id;
    const level = d.difficulty?.title;
    const points = d.difficulty?.value.toString();
    const options = _options.map(option => option.text);
    return ({
        question,
        answer,
        id,
        category,
        level,
        points,
        options
    })
});

export const book3Data = parseData(data);