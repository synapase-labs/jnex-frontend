import { useState } from "react";
import { Product } from "@/interfaces/interfaces";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface ProductFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Product>) => void;
    initialData?: Product;
    isEdit?: boolean;
}

export default function ProductForm({
    open,
    onClose,
    onSubmit,
    initialData,
    isEdit = false,
}: ProductFormProps) {
    const [formData, setFormData] = useState<Partial<Product>>(
        initialData || {
            code: "",
            name: "",
            description: "",
            price: 0,
            stock: 0,
            category: "",
            status: "active" as const
        }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        }));
    };

    const handleStatusChange = (e: SelectChangeEvent<'active' | 'inactive'>) => {
        setFormData((prev) => ({
            ...prev,
            status: e.target.value as 'active' | 'inactive',
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{isEdit ? "Edit Product" : "Create New Product"}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <div className="space-y-4">
                        <TextField
                            fullWidth
                            label="Code"
                            name="code"
                            value={formData.code || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price || 0}
                            onChange={handleInputChange}
                            required
                            inputProps={{ min: 0, step: 0.01 }}
                        />

                        <TextField
                            fullWidth
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock || 0}
                            onChange={handleInputChange}
                            required
                            inputProps={{ min: 0 }}
                        />

                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={formData.status || "active"}
                                onChange={handleStatusChange}
                                label="Status"
                                required
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
} 