module.exports = (sequelize, DataTypes) => {

    const auctionItems = sequelize.define("Auction",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        sellerEmail: {
            type: DataTypes.STRING(320),
            allowNull: false,
        },
        itemName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        itemDescription: {
            type: DataTypes.STRING(10000),
            allowNull: false,
        },
        lastPrice: {
            // TODO changed to decimal - check (money)
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        lastBidderEmail: {
            type: DataTypes.STRING(320),
            allowNull: true,
        }

    })
    return auctionItems;
}

