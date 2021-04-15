const TopLevelWrapper = function (props) {
    this.props = props;
}

TopLevelWrapper.prototype.render = function () {
    return this.props;
};

export default TopLevelWrapper;