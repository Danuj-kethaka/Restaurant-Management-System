export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const rolesArray = Array.isArray(allowedRoles[0]) 
            ? allowedRoles[0] 
            : allowedRoles;

        if (!rolesArray.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Allowed roles: ${rolesArray.join(", ")}`
            });
        }

        next();
    };
};

// Common role shortcuts
export const isAdmin = authorize("admin");
export const isManager = authorize("manager");
export const isStaff = authorize("staff");
export const isUser = authorize("user");

// Multiple roles allowed
export const isManagerOrAbove = authorize("manager", "admin");
export const isStaffOrAbove = authorize("staff", "manager", "admin");