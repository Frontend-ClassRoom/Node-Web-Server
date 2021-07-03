const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            paranoid: false,    // true면 데이터를 삭제 하지 않고 deleted_at 컬럼이 만들어져서 true로 관리 됨
            modelName: 'Comment',
            tableName: 'comments',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });  // N:1 일 땐 belongsTo, commenter 컬럼은 자동 생성 됨
    }
};
