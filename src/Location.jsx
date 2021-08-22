import { MONOPOLY_BG_COLOR, SIZE_MODIFIER, TOTAL_LOCATIONS_IN_A_ROW, VIEWPORT_UNIT, COLORS, lgaSpaces, targetList } from "./Constants";
import { getTimesAndFormat } from "./calculations";

export const Location = (props) => {
    // name - Name of the location eg. Kingsford (Best suburb)
    // parentIndex - 0 = upright,  1 = left,  2 = down, 3 = right
    // colour - colour of location bar
    const { parentIndex, index, isCorner, horizontal, isLeft } = props;

    // calculate the ranking of this one around the board, with the "go" square at 0 in the bottom-right,
    // and the one behind it at 39 (40 total squares), going clockwise around the board
    // the years are indices for the years array
    // TODO: @dan we'll have to skip where we have chance cards
    let yearIndex = 0;
    switch (parentIndex) {
        case 0:
            yearIndex = 17 + index;
            break;
        case 1:
            if (isLeft) {
                yearIndex = 8 + TOTAL_LOCATIONS_IN_A_ROW - index;
            } else {
                yearIndex = 27 + index;
            }
            break;
        case 2:
            yearIndex = 9 - index;
    }



    // dynamic CSS values
    const innerBorderWidth = 1;
    // constants
    const name = targetList[lgaSpaces[yearIndex]];
    const color = null;

    const selectedName = "Hornsby" //REPLACE THIS WITH DROPDOWN SHIT

    const bodyName = name || ""
    const yearsArray = bodyName !== "" ? getTimesAndFormat(props.selectedName) : -1
    console.log(">>>" + yearsArray)
    const years = yearsArray || ":rip:"

    const headColor = color || "purple"
    const bodyColor = MONOPOLY_BG_COLOR // Slightly off white MMMMMYES

    const locationWidthModifier = 0.0919;
    const locationWidthVal = SIZE_MODIFIER * locationWidthModifier;

    const locationWidth = locationWidthVal + VIEWPORT_UNIT;
    const locationHeadHeight = locationWidthVal * 0.3 + VIEWPORT_UNIT;
    const locationBodyHeight = locationWidthVal * 0.7 + VIEWPORT_UNIT;


    // renders corner locations
    if (isCorner === true) {
        const cornerStyle = {
            width: locationWidth,
            height: locationWidth,
            border: "1px solid black",
            backgroundColor: bodyColor,
        }

        let textDegrees = ((parentIndex === 0 && index === 0) || (parentIndex === 2 && index === 10)) ? 315 : 45
        const cornerTextStyle = {
            transform: `rotate(${textDegrees}deg)`,
            textAlign: "center",
            padding: SIZE_MODIFIER / 38 + VIEWPORT_UNIT,
        }

        return (<div style={cornerStyle}>
            <div style={cornerTextStyle}>

            </div>
        </div>)
    }

    // renders locations
    let rotateDegree = 0
    if (parentIndex === 1) {
        if (isLeft) {
            rotateDegree = 90;
        } else {
            rotateDegree = 270;
        }
    } else if (parentIndex === 2) {
        rotateDegree = 360
    }

    const locStyle = {
        transform: `rotate(${rotateDegree}deg)`,
        position: 'relative',
        backgroundColor: bodyColor,
    }
    const headLocStyle = {
        width: locationWidth,
        height: locationHeadHeight,
        backgroundColor: headColor,
        border: `${innerBorderWidth}px solid black`,
    }
    const bodyLocStyle = {
        width: locationWidth,
        height: locationBodyHeight,
        textAlign: "center",
        border: `${innerBorderWidth}px solid black`,
    }
    const yearStyle = {
        fontSize: SIZE_MODIFIER / 30 + VIEWPORT_UNIT,
    }

    const stringYears = years[yearIndex] === -1 ? "🥑" : years[yearIndex]
    const yearSpan = <span style={yearStyle}>{stringYears}</span>
    const bodyLocContent = <div>
        <>{bodyName}</>
        <div>{lgaSpaces[yearIndex] != null && yearSpan}</div>
    </div>

    let insideLocation;
    if (!(lgaSpaces[yearIndex] != null)) {
        insideLocation = <>
            <div style={{ ...bodyLocStyle, height: locationWidth }}>{bodyLocContent}</div>
        </>
    } else {
        let headerColor;
        if (yearIndex <= 3) {
            headerColor = COLORS[0];
        } else if (yearIndex <= 8) {
            headerColor = COLORS[1];
        } else if (yearIndex <= 13) {
            headerColor = COLORS[2];
        } else if (yearIndex <= 17) {
            headerColor = COLORS[3];
        } else if (yearIndex <= 22) {
            headerColor = COLORS[4];
        } else if (yearIndex <= 26) {
            headerColor = COLORS[5];
        } else if (yearIndex <= 30) {
            headerColor = COLORS[6];
        } else if (yearIndex <= 35) {
            headerColor = COLORS[7];
        }
        const headerStyle = { ...headLocStyle, backgroundColor: headerColor }
        if (parentIndex === 0) { // if top row
            insideLocation = <>
                <div style={{ ...bodyLocStyle }}>{bodyLocContent}</div>
                <div style={headerStyle}></div>
            </>
        } else {
            insideLocation = <>
                <div style={headerStyle}></div>
                <div style={bodyLocStyle}>{bodyLocContent}</div>
            </>
        }
    }

    return (<div style={locStyle} className="no-margin-or-padding">{insideLocation}</div>
    )
}
