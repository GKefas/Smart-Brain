import './Rank.css';

const Rank = ({ name, entries }) => {
    return (

        <div className="tc ma0 rank">
            <div className="f3 black v-btm shadowText">
                {`${name}, ur current entry count is`}
            </div>
            <div className="f1 rank-number">
                {entries}
            </div>
            <p className="f3 tc black shadowText">
                {'Step into enchantment while this reveals hidden faces in your images. Try it now!'}
            </p>
        </div>
    );
}

export default Rank;
