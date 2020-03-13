//material_dashed_lines.dashSize= 3;
//## GEOMETRY AND MESHES
class Selectable_Zone {
    test = 1;
    mesh;
    line;

    parse_coord(coord) {
        var no_b1 = coord.replace("(", "");
        var no_b2 = no_b1.replace(")", "");
        var split = no_b2.split(",");
        var coord_new = {
            "x": parseFloat(split[0]),
            "y": parseFloat(split[1]),
            "z": parseFloat(split[2])
        }
        return coord_new;
    }

    constructor(coords) {
        //console.log(coords);
        this.ID = coords._id; //WARNING THIS DOES NOT MATCH WITH COORDS ID


        var coord1 = this.parse_coord(coords.coordinates_1);
        var coord2 = this.parse_coord(coords.coordinates_2);

        let position = new THREE.Vector3(0, 1, 0);
        this.size = new THREE.Vector3(0.1, 0.1, 0.1);

        this.size.x = Math.abs(coord1.x - coord2.x);
        if (coord1.x > coord2.x) {
            //x size range
            position.x = coord2.x + (this.size.x / 2);
        }
        else {
            position.x = coord1.x + (this.size.x / 2);
        }

        this.size.y = Math.abs(coord1.y - coord2.y);
        if (coord1.y > coord2.y) {
            //y size range
            position.y = coord2.y + (this.size.y / 2);
        } else {
            position.y = coord1.y + (this.size.y / 2);
        }

        this.size.z = Math.abs(coord1.z - coord2.z);
        if (coord1.z > coord2.z) {
            //z size range
            position.z = coord2.z + (this.size.z / 2);
        }
        else {
            position.z = coord1.z + (this.size.z / 2);
        }

        this.geometry = new THREE.CubeGeometry(this.size.x, this.size.y, this.size.z);
        this.mesh = new THREE.Mesh(this.geometry, material_selectable);
        this.mesh.userData = { ID: this.ID };
        this.edges = new THREE.EdgesGeometry(this.geometry);
        this.line = new THREE.LineSegments(this.edges, material_dashed_lines);
        this.mesh.position.set(position.x, position.y, position.z);
        this.line.position.set(position.x, position.y, position.z);
        var rot = parseFloat(coords.rotation)
        this.mesh.rotation.y = rot;
        this.line.rotation.y = rot;

        this.data = undefined;
    }

}
