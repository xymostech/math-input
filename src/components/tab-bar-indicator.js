/**
 * A component that renders a tab bar with titles for each tab and an underline
 * to indicate the active tab.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { Text, View } = require('../fake-react-native-web');
const { brightGreen, darkGrey } = require('./common-style');

const Tab = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        title: React.PropTypes.string.isRequired,
    },

    render() {
        const { active, onClick, title } = this.props;

        const textStyle = [
            styles.tabTitleText,
            active && styles.activeTabTitleText,
        ];

        // TODO(charlie): Use `onTouchEnd` rather than `onClick` to avoid
        // delay. This requires verifying that the touch ended in the view.
        return <View style={styles.tab} onClick={onClick}>
            <Text style={textStyle}>{title}</Text>
            {active && <View style={styles.activeTabUnderline} />}
        </View>;
    },
});

const TabBarIndicator = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.number.isRequired,
        onSelectTab: React.PropTypes.func,
        pageTitles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    },

    render() {
        const { currentPage, onSelectTab, pageTitles } = this.props;

        const tabTitles = pageTitles.map((title, i) => {
            return <Tab
                key={i}
                active={i === currentPage}
                onClick={() => onSelectTab(i)}
                title={title}
            />;
        });

        return <View style={styles.tabBar}>
            {tabTitles}
        </View>;
    },
});

// The width beyond which the tab bar underline extends past the edges of the
// title for that tab.
const tabUnderlineExtraWidthPx = 10;

const activeColor = brightGreen;
const inactiveColor = darkGrey;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
    },

    tab: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: tabUnderlineExtraWidthPx,
        paddingRight: tabUnderlineExtraWidthPx,
    },

    // TODO(charlie): Use Proxima, once it's available.
    tabTitleText: {
        fontSize: 14,
        fontFamily: 'Proxima Nova Semibold',
        color: inactiveColor,
    },

    activeTabTitleText: {
        color: activeColor,
    },

    activeTabUnderline: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderRadius: 2,
        height: 2,
        backgroundColor: activeColor,
    },
});

module.exports = TabBarIndicator;
